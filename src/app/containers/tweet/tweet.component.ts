import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import _ from 'lodash';


import {IAppState} from '../../store/state/app.state';
import {selectSelectedTweet} from '../../store/selectors/tweet.selector';
import {GetTweet} from '../../store/actions/tweet.actions';

@Component({
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  tweet$ = this.store.pipe(select(selectSelectedTweet));

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (_.get(this.route, 'snapshot.params.id')) {
      this.store.dispatch(new GetTweet(this.route.snapshot.params.id));
    }
  }
}
