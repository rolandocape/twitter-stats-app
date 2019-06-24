import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Store, select} from '@ngrx/store';
import {of} from 'rxjs';
import {switchMap, map, withLatestFrom} from 'rxjs/operators';
import _ from 'lodash';

import {IAppState} from '../state/app.state';
import {
  GetTweetsSuccess,
  ETweetActions,
  GetTweetSuccess,
  GetTweet,
  GetTweets
} from '../actions/tweet.actions';
import {selectTweetList} from '../selectors/tweet.selector';
import {selectTwitterStats} from '../selectors/twitter-stats.selector';

@Injectable()
export class TweetEffects {
  @Effect()
  getTweet$ = this.actions$.pipe(
    ofType<GetTweet>(ETweetActions.GetTweet),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectTweetList))),
    switchMap(([id, tweets]) => {
      const selectedTweet = tweets.find(tweet => tweet.id === +id);
      return of(new GetTweetSuccess(selectedTweet));
    })
  );

  @Effect()
  getTweets$ = this.actions$.pipe(
    ofType<GetTweets>(ETweetActions.GetTweets),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectTwitterStats))),
    switchMap(([key, stats]) => {
      const tweets = _.get(stats, 'rawData', [])
        .filter(tweet => {
          const hashtags = _.get(tweet, 'entities.hashtags', []);
          return hashtags.some(({text}) => text.includes(key));
        });
      return of(new GetTweetsSuccess(tweets));
    })
  );

  constructor(private actions$: Actions, private store: Store<IAppState>) {
  }
}
