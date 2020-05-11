const amqp = require('amqplib/callback_api');
const NewsSchema = require('../models/NewsModel');
// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
  if (connError) {
    throw connError;
  }
  // Step 2: Create Channel
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    // Step 3: Assert Queue
    const QUEUE = 'news';
    channel.assertQueue(QUEUE);
    // Step 4: Receive Messages
    channel.consume(
      QUEUE,
      (msg) => {
        let result = {};
        result.data = msg;
        const News = new NewsSchema(result.data);
        News.save();
        console.log(`Message received:`);
      },
      {
        noAck: true,
      }
    );
  });
});
