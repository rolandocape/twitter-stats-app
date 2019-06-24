import {createSelector} from '@ngrx/store';

import {IAppState} from '../state/app.state';
import {ITwitterStatsState} from '../state/twitter-stats.state';

const twitterStatsState = (state: IAppState) => state.twitterStats;

export const selectTwitterStats = createSelector(
  twitterStatsState,
  (state: ITwitterStatsState) => state
);
