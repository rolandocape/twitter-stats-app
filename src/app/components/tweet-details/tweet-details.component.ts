import {Component, Input} from '@angular/core';

import {ITweet} from '../../models/tweet.interface';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent {
  @Input()
  tweet: ITweet;
}
