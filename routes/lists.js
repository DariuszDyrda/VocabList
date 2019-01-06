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
      res.render('index', {lists: lists});
    }
  })
});

module.exports = router;
