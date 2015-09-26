import tweetFormat from './dataFormat.js'
import traverse from 'traverse'
import sentiment from 'sentiment'
import Firebase from 'firebase'
import axios from 'axios'

let paths = traverse(tweetFormat).paths();
let fieldPaths = [];
let restUrl = 'https://watchdoglb.firebaseio.com/reports';
let ref = new Firebase(restUrl);
    ref.authWithPassword({
            email    : 'rakannimer@gmail.com',
            password : 'twitterClient'
    }, function(error, authData) {
        console.log(error);
        console.log(authData);
    });


export default class TweetModel {

    constructor(tweet) {



        if (tweet) {
            this.tweet = this.parseTweet(tweet);
        }
    }

    getDesiredFields() {
        return traverse(tweetFormat).reduce(function (acc, nodeValue) {
            if (this.isLeaf) { 
                if (nodeValue === 1) {
                    acc.push(this.path);
                }
            }
            return acc;
        }, []);
    }

    setCategory(category) {
        this.tweet.category = category;
    }

    parseTweet(tweet) {
        let tweetSentiment = sentiment(tweet.text);

        let report = {
            description : tweet.text,
            sentiment_score : tweetSentiment.score,
            created_at : tweet.created_at,
            from_twitter : true,
            twitter_id : tweet.id_str,
            has_location : 0
        }; 
        if (tweet.coordinates) {
            if (tweet.coordinates.coordinates !== null) {
                report.coordinates = tweet.coordinates.coordinates;
                report.has_location = 1;
            }
        }
        return report;
    }

    save() {
        ref.push(this.tweet);
    }

}
