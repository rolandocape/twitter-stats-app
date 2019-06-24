import {Injectable} from '@angular/core';
import {PubNubAngular} from 'pubnub-angular2';
import {twitterConfig} from './twitter.constants';

const {subscribeKey, channel} = twitterConfig;

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  subscribers = [];

  constructor(private pubnub: PubNubAngular) {
    pubnub.init({subscribeKey});
    pubnub.addListener({message: this.handleTweet});
    pubnub.subscribe({channels: [channel]});
  }

  handleTweet = (tweet) => {
    this.subscribers.forEach(callback => callback(tweet));
  };

  addListener(subscriberCallback) {
    this.subscribers.push(subscriberCallback);
  }
}
