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

  router.put('/index/:id/words/:wordId', (req, res) => {
    Word.findByIdAndUpdate(req.params.wordId, req.body.word, function(err, word) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/index/"+req.params.id);
        }
    })
  });

  module.exports = router;