const express = require('express');
const List = require('../models/List');
const Word = require('../models/Word');
const router = express.Router();

router.post('/index/:id/words', (req, res) => {
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