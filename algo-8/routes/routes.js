const express = require('express');
const router = express.Router();
const { getTweets } = require('../controllers/twitterController');
const { getGoogleNews } = require('../controllers/googlenewsController');

router.route('/twitter').post(getTweets);

router.route('/googlenews').get(getGoogleNews);

module.exports = router;
