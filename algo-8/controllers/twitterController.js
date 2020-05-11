const Twitter = require('../services/TwitterService');
const publishToQueue = require('../services/MQSender');
/*
@desc Get all the tweets
@route GET/api/?=tweet
@access twitterauthorized
*/

exports.getTweets = async (req, res, next) => {
  const tweetName = req.query.tweet;
  let stream = Twitter.stream('statuses/filter', {
    track: tweetName,
    language: 'en',
  });

  stream.on('tweet', function (tweet) {
    publishToQueue('tweet', tweet.toString());
    res.status(200).json({ messageSent: true });
  });

  stream.on('error', function (err) {
    console.log(err);
  });
};
