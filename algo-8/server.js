const express = require('express');
const mongodb = require('./config/db');
const app = express();
const env = require('dotenv');
const colors = require('colors');

// load the config file
env.config({ path: './config/config.env' });

const routes = require('./routes/routes');

// bodyparsers
app.use(express.json());

// mongodb start
mongodb();

// routes
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.NODE_ENV} listening on to the port ${PORT}`
      .yellow
  );
});
