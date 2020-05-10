const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  data: Object,
});

module.exports = mongoose.model('news', NewsSchema);
