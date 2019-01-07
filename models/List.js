const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: String,
  description: String,
  language: String,
  words: [
    {
      original: String,
      translation: String,
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('list', ListSchema);
