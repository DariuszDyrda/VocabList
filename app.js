const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");

const listsRouter = require('./routes/lists');
const wordsRouter = require('./routes/words');
const List = require('./models/List');
const User = require('./models/User');
const seedDb = require('./seeds');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride('_method'));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals = {
    user: req.user
  };
  next();
});

app.use('/', listsRouter);
app.use('/', wordsRouter);

mongoose.connect(process.env.vocabAppDb, { useNewUrlParser: true });

//seedDb();

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started!');
});
