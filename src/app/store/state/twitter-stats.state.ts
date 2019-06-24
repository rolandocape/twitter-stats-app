import {ICounters, IStats, IGroups} from '../../models/twitter-stats.interface';
import {ITweet} from '../../models/tweet.interface';

export interface ITwitterStatsState {
  counters: ICounters;
  stats: IStats;
  groups: IGroups;
  rawData: ITweet[];
}

export const initialTwitterStatsState: ITwitterStatsState = {
    counters: {
      numberOfTweetsReceived: null,
      numberOfTweetsWithHashtags: null,
      numberOfTweetsWithPhotoUrls: null,
      numberOfTweetsWithUrls: null,
      numberOfTweetsWithEmojis: null,
    },
    stats: {
      averageTweetsPerHour: null,
      averageTweetsPerMinute: null,
      averageTweetsPerSecond: null,
      percentageOfTweetsThatContainsUrls: null,
      percentageOfTweetsThatContainPhotoUrls: null,
      percentageOfTweetsThatContainsEmojis: null,
      topHashtags: null,
      topDomains: null,
      topEmojis: null,
    },
    groups: {
      hours: null,
      minutes: null,
      seconds: null,
      emojis: null,
    },
    rawData: []
  }
;
