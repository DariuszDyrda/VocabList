const express = require('express');
const passport = require('passport');
const List = require('../models/List');
const Word = require('../models/Word');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing');
});
router.get('/register', function(req, res) {
  res.render('register', { });
});
router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { user : user });
      }

      passport.authenticate('local')(req, res, function () {
          res.redirect('/index');
      });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/index');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/index');
});
router.get('/index', (req, res) => {
  List.find({}, (err, lists) => {
    if(err) {
      console.log(err);
    }
    else {
      res.render('lists/index', {lists: lists});
    }
  })
});
router.get('/index/new', (req, res) => {
  res.render('lists/new');
});
router.post('/index', (req, res) => {
  List.create(req.body.list, (err, list) => {
    if(err) {
        console.log(err);
    }
    else {
      res.redirect('/index');
    }
});
});
router.get('/index/:id', (req, res) => {
  List.findById(req.params.id).populate('words').exec(function(err, list) {
    if(err) {
      console.log(err);
    } else {
      res.render('lists/show', {list: list});
    }
  });
});
router.get('/index/:id/edit', (req, res) => {
  List.findById(req.params.id, function(err, list) {
    if(err) {
      console.log(err);
    } else {
      res.render('lists/edit', {list: list});
    }
  })
});
router.put('/index/:id', (req, res) => {
  List.findByIdAndUpdate(req.params.id, req.body.list, function(err, word) {
    if(err) {
        console.log(err);
    } else {
        res.redirect("/index/"+req.params.id);
    }
})
});
router.delete('/index/:id', (req, res) => {
  List.findByIdAndRemove(req.params.id, function(err, word) {
    if(err) {
        console.log(err);
    } else {
        res.redirect("/index/");
    }
})
})

module.exports = router;
