const publishToQueue = require('../services/MQSender');
const newsService = require('../services/newsService');
const axios = require('axios');
/*
@desc Get all the news
@route GET/api/news?='news'
@access googleauthorized
*/

exports.getGoogleNews = async (req, res, next) => {
  const newsName = req.query.newsname;
  const resultNews = await newsService(newsName);
  let result = '';
  try {
    result = await axios.get(resultNews);
  } catch (error) {
    console.log(error.red);
  } finally {
    publishToQueue('news', result.data.toString());
    res.status(200).json(result.data);
  }
};
