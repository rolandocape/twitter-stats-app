import {RouterReducerState} from '@ngrx/router-store';

import {ITweetState} from './tweet.state';
import {ITwitterStatsState} from './twitter-stats.state';

export interface IAppState {
  router?: RouterReducerState;
  tweets: ITweetState;
  twitterStats: ITwitterStatsState;
}
