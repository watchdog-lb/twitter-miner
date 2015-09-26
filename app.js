import TweetTracker from './TweetTracker';
var twitterConfig = require('./config').Twitter; 
import TwitterController from './TwitterController'


TweetTracker.init(twitterConfig).track('amsterdam');

//TweetTracker.T.on('tweet', Tweet.tweetReceived.bind(this));