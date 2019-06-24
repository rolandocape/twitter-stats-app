import {Action} from '@ngrx/store';

import {ITweet} from '../../models/tweet.interface';

export enum ETweetActions {
  GetTweets = '[Tweet] Get Tweets',
  GetTweetsSuccess = '[Tweet] Get Tweets Success',
  GetTweet = '[Tweet] Get Tweet',
  GetTweetSuccess = '[Tweet] Get Tweet Success'
}

export class GetTweets implements Action {
  public readonly type = ETweetActions.GetTweets;

  constructor(public payload: string) {
  }
}

export class GetTweetsSuccess implements Action {
  public readonly type = ETweetActions.GetTweetsSuccess;

  constructor(public payload: ITweet[]) {
  }
}

export class GetTweet implements Action {
  public readonly type = ETweetActions.GetTweet;

  constructor(public payload: number) {
  }
}

export class GetTweetSuccess implements Action {
  public readonly type = ETweetActions.GetTweetSuccess;

  constructor(public payload: ITweet) {
  }
}

export type TweetActions = GetTweets | GetTweetsSuccess | GetTweet | GetTweetSuccess;
