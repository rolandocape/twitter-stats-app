interface IUrl {
  url: string;
  text: string;
  display_url: string;
}

interface IHashtag {
  text: string;
}

interface IUser {
  id: number;
  name: string;
  screen_name: string;
  location: string;
  url: string;
  description: string;
  followers_count: number;
  friends_count: number;
}

interface IPlace {
  country: string;
  name: string;
  place_type: string;
}


export interface ITweet {
  id: number;
  created_at: string;
  reply_count: number;
  retweet_count: number;
  source: string
  user: IUser;
  place: IPlace;
  entities: {
    hashtags: IHashtag[];
    urls: IUrl[];
  };
}



