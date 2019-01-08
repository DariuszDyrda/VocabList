const express = require('express');
const List = require('../models/List');
const Word = require('../models/Word');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing');
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
router.post('/index/:id', (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if(err) {
      console.log(err);
    } else {
      let word = new Word(req.body.word);
      word.save();
      list.words.push(word);
      list.save();
      res.redirect(`/index/${list._id}`);
    }
  });
});

module.exports = router;
