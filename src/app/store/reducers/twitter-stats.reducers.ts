import * as moment from 'moment';
import _ from 'lodash';

import {TwitterStatsActions, ETwitterStatsActions} from '../actions/twitter-stats.actions';
import {initialTwitterStatsState, ITwitterStatsState} from '../state/twitter-stats.state';
import {TweetUtils} from '../../utils/index';

export const twitterStatsReducers = (state = initialTwitterStatsState,
                                     action: TwitterStatsActions): ITwitterStatsState => {
  switch (action.type) {
    case ETwitterStatsActions.ProcessTweet: {
      return getNewTweetsState(state, action.payload);
    }
    default:
      return state;
  }
};

function getNewTweetsState(state, tweet) {
  const {rawData: data} = state;
  const rawData = [...data, tweet];

  // Keep only 1k the last records
  if (rawData.length > 1000) {
    rawData.shift();
  }

  const tweetsData = _.omit(state, ['rawData', 'stats']);
  const processedData = processTweetData(tweetsData, tweet);
  const stats = generateTweetStats(processedData);

  return {
    ...processedData,
    stats,
    rawData,
  };
}

function processTweetData(data, tweet) {
  const {created_at: createdAt, entities, text} = tweet;
  const date = moment(new Date(createdAt));
  const emojis = TweetUtils.extractTextEmojis(text);
  const paths = [
    `groups.hours.${date.format('MMDDYYhh')}`,
    `groups.minutes.${date.format('MMDDYYhhmm')}`,
    `groups.seconds.${date.format('MMDDYYhhmmss')}`,
    'counters.numberOfTweetsReceived',
  ];

  if (_.get(emojis, 'length', 0) > 0) {
    const emojiPaths = emojis.map(emoji => `groups.emojis.${emoji}`);
    paths.push(...emojiPaths, 'counters.numberOfTweetsWithEmojis');
  }

  if (_.get(entities, 'hashtags.length') > 0) {
    const hashtagPaths = entities.hashtags.map(({text}) => `groups.hashtags.${text}`);
    paths.push(...hashtagPaths, 'counters.numberOfTweetsWithHashtags');
  }

  if (_.get(entities, 'urls.length') > 0) {
    const urlPaths = [];
    const containsPhotoUrl = entities.urls.find(url => {
      const urlString = _.get(url, 'expanded_url') || _.get(url, 'url', '');
      return urlString.includes('pic.twitter.com') || urlString.includes('instagram');
    });
    const domainPaths = entities.urls.map(url => {
      const urlString = _.get(url, 'expanded_url') || _.get(url, 'url', '');
      return `groups.domains['${new URL(urlString).hostname.replace('www.', '')}']`;
    });

    if (containsPhotoUrl) {
      urlPaths.push('counters.numberOfTweetsWithPhotoUrls');
    }

    urlPaths.push(...domainPaths);
    paths.push(...urlPaths, 'counters.numberOfTweetsWithUrls');
  }

  paths.forEach(path => {
    const currentValue = _.get(data, path, 0);
    _.set(data, path, currentValue + 1);
  });

  return data;
}

function generateTweetStats(data) {
  const results: any = {};

  // Avg tweets per hour/minute/second
  results.averageTweetsPerHour = TweetUtils.calculateGroupAvg('hours', data);
  results.averageTweetsPerMinute = TweetUtils.calculateGroupAvg('minutes', data);
  results.averageTweetsPerSecond = TweetUtils.calculateGroupAvg('seconds', data);

  // Percentage of tweets that contains urls/photo-urls/emojis
  results.percentageOfTweetsThatContainsUrls = TweetUtils.getPercentage('numberOfTweetsWithUrls', data);
  results.percentageOfTweetsThatContainPhotoUrls = TweetUtils.getPercentage('numberOfTweetsWithPhotoUrls', data);
  results.percentageOfTweetsThatContainsEmojis = TweetUtils.getPercentage('numberOfTweetsWithEmojis', data);

  // Top hashtags/domains in tweets
  results.topHashtags = TweetUtils.getTop5InGroup('hashtags', data);
  results.topDomains = TweetUtils.getTop5InGroup('domains', data);
  results.topEmojis = TweetUtils.getTop5InGroup('emojis', data);

  return results;
}
