import {createSelector} from '@ngrx/store';

import {IAppState} from '../state/app.state';
import {ITweetState} from '../state/tweet.state';

const selectTweets = (state: IAppState) => state.tweets;

export const selectTweetList = createSelector(
  selectTweets,
  (state: ITweetState) => state.tweets
);

export const selectSelectedTweet = createSelector(
  selectTweets,
  (state: ITweetState) => state.selectedTweet
);
