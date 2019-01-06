const mongoose = require('mongoose');

let ListSchema = new mongoose.Schema({
  name: String,
  description: String,
  words: [
    {
      original: String,
      translation: String,
    },
  ],
});

module.exports = mongoose.model('list', ListSchema);
