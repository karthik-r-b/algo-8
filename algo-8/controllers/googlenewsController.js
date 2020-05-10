const publishToQueue = require('../services/MQSender');
const newsService = require('../services/newsService');
const NewsSchema = require('../models/NewsModel');
const axios = require('axios');
/*
@desc Get all the news
@route GET/api/news
@access twitterauthorized
*/

exports.getGoogleNews = async (req, res, next) => {
  const newsName = req.query.newsname;
  const resultNews = await newsService(newsName);
  let result = '';
  try {
    result = await axios.get(resultNews);
    const News = new NewsSchema(result);
    News.save();
  } catch (error) {
    console.log(error);
  } finally {
    publishToQueue('news', result.data.toString());
    res.status(200).json(result.data);
  }
};
