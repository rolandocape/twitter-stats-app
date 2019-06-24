import {GetTweets} from '../../store/actions/tweet.actions';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import _ from 'lodash';

import {IAppState} from '../../store/state/app.state';
import {selectTweetList} from '../../store/selectors/tweet.selector';
import {selectTwitterStats} from '../../store/selectors/twitter-stats.selector';
import {Router} from '@angular/router';

@Component({
  templateUrl: './twitter-stats.component.html',
  styleUrls: ['./twitter-stats.component.css']
})
export class TwitterStatsComponent implements OnInit, OnDestroy {
  counters: any;
  stats: any;
  calculatedStats: any;
  subscription;
  searchTrigered = false;
  tweets;

  constructor(private store: Store<IAppState>, private router: Router) {
  }

  ngOnInit() {
    this.subscription = combineLatest(
      this.store.pipe(select(selectTweetList)),
      this.store.pipe(select(selectTwitterStats))
    )
      .subscribe(([searchResults = [], statsData]) => {
        const {counters, stats, rawData = []} = statsData;
        this.tweets = this.searchTrigered ? searchResults : rawData.slice(Math.max(rawData.length - 10, 1));
        this.counters = counters;
        this.stats = stats;
        this.calculatedStats = _.omit(stats, ['topHashtags', 'topDomains', 'topEmojis']);
      });
  }

  navigateToUser(id: number) {
    if (this.searchTrigered) {
      this.router.navigate(['tweet', id]);
    }
  }

  search($event: KeyboardEvent, term: string): void {
    if ($event.key === 'Enter') {
      this.searchTrigered = true;
      this.store.dispatch(new GetTweets(term));
    }
  }

  clearSearchResults(): void {
    this.searchTrigered = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
