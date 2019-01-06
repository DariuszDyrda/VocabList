const express = require('express');
const mongoose = require('mongoose');
const listsRouter = require('./routes/lists');

const app = express();
app.set('view engine', 'ejs');
app.use('/', listsRouter);

mongoose.connect('mongodb://admin:developer1@ds026658.mlab.com:26658/vocablist_dev', { useNewUrlParser: true });

app.listen(3000, () => {
  console.log('The server has started!');
});
