const express = require('express');
const passport = require('passport');
const fs = require('fs');
const pdf = require('html-pdf');
const ejs = require('ejs');
const List = require('../models/List');
const Word = require('../models/Word');
const User = require('../models/User');
const router = express.Router();

const middleware = require('../middleware/index');

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
  if(req.user) {
  User.findById(req.user._id).populate('lists').populate('followedLists').exec(function (err, user) {
      if(err) {
        console.log(err);
      } else {
        res.render('lists/index', {lists: user.lists, followedLists: user.followedLists});
      }
    })
  } else {
      res.redirect('/index/explore');
  }
});
router.get('/index/explore', (req, res) => {
  List.find({}, (err, lists) => {
    if(err) {
      console.log(err);
    }
    else {
      res.render('lists/explore', {lists: lists});
    }
  });
});
router.get('/index/new', middleware.isLoggedIn, (req, res) => {
  res.render('lists/new');
});
router.post('/index', middleware.isLoggedIn, (req, res) => {
  List.create(req.body.list, async (err, list) => {
    if(err) {
        console.log(err);
    }
    else {
      list.author.id = req.user._id;
      list.author.username = req.user.username;
      await list.save();
      User.findById(req.user._id, async (err, user) => {
        if(err) {
          console.log(err);
        } else {
          user.lists.push(list);
          await user.save();
        }
      });
      res.redirect('/index');
    }
});
});
router.get('/index/:id', (req, res) => {
  List.findById(req.params.id).populate('words').populate('followedBy').exec(function(err, list) {
    if(err) {
      console.log(err);
    } else {
      res.render('lists/show', {list: list});
    }
  });
});
router.get('/index/:id/edit', middleware.checkListOwnership, (req, res) => {
  List.findById(req.params.id, function(err, list) {
    if(err) {
      console.log(err);
    } else {
      res.render('lists/edit', {list: list});
    }
  })
});
router.put('/index/:id', middleware.checkListOwnership, (req, res) => {
  List.findByIdAndUpdate(req.params.id, req.body.list, function(err, word) {
    if(err) {
        console.log(err);
    } else {
        res.redirect("/index/"+req.params.id);
    }
})
});
router.delete('/index/:id', middleware.checkListOwnership, (req, res) => {
  List.findByIdAndRemove(req.params.id, function(err, word) {
    if(err) {
        console.log(err);
    } else {
        res.redirect("/index/");
    }
})
});
router.get('/index/:id/pdfexport' , (req, res) => {
  List.findById(req.params.id).populate('words').exec(function(err, list) {
    if(err) {
      console.log(err);
    } else {
      ejs.renderFile('views/lists/show.ejs', {list: list, user: req.user}, function(err, str) {
        if(err) {
          console.log(err);
        } else {
            var options = { 
              format: 'Letter',
               border: {
                top: "2cm",           
                right: "1cm",
                bottom: "2cm",
                left: "1cm"
            }
           };
  
            pdf.create(str, options).toFile('./businesscard.pdf', function(err, res) {
              if (err) return console.log(err);
            });
        }
      })
    }
  });
  
});
router.post('/index/:id/follow', middleware.isLoggedIn, (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if(err) {
      console.log(err);
    } else {
      User.findById(req.user._id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          user.followedLists.push(list);
          user.save();
          list.followedBy.push(user);
          list.save();
          res.redirect('/index/'+req.params.id);
        }
      })
    }
  });
})
router.post('/index/:id/unfollow', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if(err) {
      console.log(err);
    } else {
      User.findById(req.user._id, (err, user) => {
        if(err) {
          console.log(err);
        } else {
          user.followedLists.pop(list);
          user.save();
          list.followedBy.pop(user);
          list.save();
          res.redirect('/index/'+req.params.id);
        }
      })
    }
  });
})

module.exports = router;
