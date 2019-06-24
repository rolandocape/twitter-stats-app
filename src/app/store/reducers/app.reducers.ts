import {ActionReducerMap} from '@ngrx/store';
import {routerReducer as router} from '@ngrx/router-store';

import {IAppState} from '../state/app.state';
import {twitterStatsReducers as twitterStats} from './twitter-stats.reducers';
import {tweetReducers as tweets} from './tweet.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router,
  tweets,
  twitterStats,
};
