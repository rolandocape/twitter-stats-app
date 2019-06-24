import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {IAppState} from './store/state/app.state';
import {ProcessTweet} from './store/actions/twitter-stats.actions';
import {TwitterService} from './services/twitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>, private twitterService: TwitterService) {
  }

  ngOnInit() {
    this.twitterService.addListener(this.onMessage);
  }

  onMessage = ({message}) => {
    this.store.dispatch(new ProcessTweet(message));
  }
}
