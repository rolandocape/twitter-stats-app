import {Action} from '@ngrx/store';

import {ITweet} from '../../models/tweet.interface';

export enum ETwitterStatsActions {
  ProcessTweet = '[Tweets] Process Tweet',
}

export class ProcessTweet implements Action {
  public readonly type = ETwitterStatsActions.ProcessTweet;

  constructor(public payload: ITweet) {
  }
}

export type TwitterStatsActions = ProcessTweet;

