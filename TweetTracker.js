import Twitter from 'node-tweet-stream';
import Tweet from './TweetModel';

let TweetTracker = {
    
    init(twitterConfig) {
      this.T = new Twitter(twitterConfig);
      this.bindEvents();
      return this;
    },
    
    track(keyword) {
        this.keyword = keyword;
        this.T.track(keyword);
    },

    bindEvents() {
        this.T.on('error', this.error.bind(this));
        this.T.on('tweet', this.tweetReceived.bind(this));
    },

    tweetReceived(tweet) {
        console.log("Here");
        let tweetModel = new Tweet(tweet);
        tweetModel.setCategory(this.keyword);
        console.log("Here");
        tweetModel.save();        
    },

    error(error) {
      console.log("Errror : ", error);
    }
};

export default TweetTracker;