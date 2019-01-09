const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: String,
  description: String,
  language: String,
  words: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Word',
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('List', ListSchema);
