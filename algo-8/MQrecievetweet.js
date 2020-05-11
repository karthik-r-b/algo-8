const amqp = require('amqplib/callback_api');
const TwitterSchema = require('../models/TwitterModel');
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
    const QUEUE = 'tweet';
    channel.assertQueue(QUEUE);
    // Step 4: Receive Messages
    channel.consume(
      QUEUE,
      (msg) => {
        let result = {};
        result.data = msg;
        const Twitter = new TwitterSchema(result.data);
        Twitter.save();
        console.log(`Message received:`);
      },
      {
        noAck: true,
      }
    );
  });
});
