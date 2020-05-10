const newsService = async (newsName) => {
  let api = process.env.GOOGLE_NEWS_API;
  api = api + newsName + '&apiKey=' + process.env.API_KEY;
  return api;
};

module.exports = newsService;
