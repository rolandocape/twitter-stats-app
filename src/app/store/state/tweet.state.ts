import {ITweet} from '../../models/tweet.interface';

export interface ITweetState {
  tweets: ITweet[];
  selectedTweet: ITweet;
}

export const initialTweetState: ITweetState = {
  tweets: null,
  selectedTweet: null
};
