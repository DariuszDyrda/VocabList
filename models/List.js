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
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('list', ListSchema);
