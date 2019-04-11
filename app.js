const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");

const flash = require('connect-flash');

const listsRouter = require('./routes/lists');
const wordsRouter = require('./routes/words');
const List = require('./models/List');
const User = require('./models/User');
const seedDb = require('./seeds');

const DB_URL = process.env.vocabAppDb ? process.env.vocabAppDb : 'mongodb://localhost:27017/vocabapp'

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('keyboard cat'));
app.use(require("express-session")({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride('_method'));

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals = {
    user: req.user,
    success: req.flash('success'),
    error: req.flash('error')
  };
  next();
});

app.use('/', listsRouter);
app.use('/', wordsRouter);

mongoose.connect(DB_URL, { useNewUrlParser: true });

//seedDb();

app.listen(process.env.PORT || 3000, () => {
  console.log('The server has started!');
});
