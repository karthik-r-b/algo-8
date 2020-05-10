const Twitter = require('../services/TwitterService');
const TwitterSchema = require('../models/TwitterModel');
const publishToQueue = require('../services/MQSender');
/*
@desc Get all the tweets
@route GET/api/:tweet
@access twitterauthorized
*/

exports.getTweets = async (req, res, next) => {
  const tweetName = req.body.tweet;
  const db = req.app.locals.db;

  let stream = Twitter.stream('statuses/filter', {
    track: tweetName,
    language: 'en',
  });

  stream.on('tweet', function (tweet) {
    publishToQueue('tweet', tweet.toString());
    tweet.data = tweet;
    const Twitter = new TwitterSchema(tweet);
    Twitter.save();
    res.status(200).json({ messageSent: true });
  });

  stream.on('error', function (err) {
    console.log(err);
  });
};
