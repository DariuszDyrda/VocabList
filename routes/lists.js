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
