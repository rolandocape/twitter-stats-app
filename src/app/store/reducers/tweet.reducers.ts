import {ETweetActions} from '../actions/tweet.actions';
import {TweetActions} from '../actions/tweet.actions';
import {initialTweetState, ITweetState} from '../state/tweet.state';

export const tweetReducers = (state = initialTweetState, action: TweetActions): ITweetState => {
  switch (action.type) {
    case ETweetActions.GetTweetsSuccess: {
      return {
        ...state,
        tweets: action.payload
      };
    }
    case ETweetActions.GetTweetSuccess: {
      return {
        ...state,
        selectedTweet: action.payload
      };
    }
    default:
      return state;
  }
};
