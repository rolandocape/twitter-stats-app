export interface ICounters {
  numberOfTweetsReceived: number;
  numberOfTweetsWithHashtags: number;
  numberOfTweetsWithPhotoUrls: number;
  numberOfTweetsWithUrls: number;
  numberOfTweetsWithEmojis: number;
}

 export interface IStats {
  averageTweetsPerHour: number;
  averageTweetsPerMinute: number;
  averageTweetsPerSecond: number;
  percentageOfTweetsThatContainsUrls: number;
  percentageOfTweetsThatContainPhotoUrls: number;
  percentageOfTweetsThatContainsEmojis: number;
  topHashtags: number;
  topDomains: number;
  topEmojis: number;
}

export interface IGroups {
  hours: object;
  minutes: object;
  seconds: object;
  emojis: object;
}
