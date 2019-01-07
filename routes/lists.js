const express = require('express');
const List = require('../models/List');
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

module.exports = router;
