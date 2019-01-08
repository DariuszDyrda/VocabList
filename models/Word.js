const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    original: String,
    translation: String
});

module.exports = mongoose.model('Word', wordSchema);