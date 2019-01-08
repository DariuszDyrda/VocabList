const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const listsRouter = require('./routes/lists');
const wordsRouter = require('./routes/words');
const List = require('./models/List');
const seedDb = require('./seeds');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/', listsRouter);
app.use('/', wordsRouter);

mongoose.connect('mongodb://admin:developer1@ds026658.mlab.com:26658/vocablist_dev', { useNewUrlParser: true });

seedDb();

app.listen(3000, () => {
  console.log('The server has started!');
});
