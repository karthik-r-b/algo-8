const mongoose = require('mongoose');

const mongodb = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  });
  console.log(`mongodb connected`.cyan.underline);
};

// const express = require('express');
// const app = express();
// const mongodb = require('mongodb');
// const client = mongodb.MongoClient;
// const dbName = 'socialentertainment';

// const mongodbConnection = async () => {
//   try {
//     const connection = await client.connect(process.env.MONGODB_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//     console.log(`mongodb connected`.cyan.underline);
//     return connection.db(dbName);
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = mongodb;
