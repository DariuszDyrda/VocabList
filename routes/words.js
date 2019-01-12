const express = require('express');
const List = require('../models/List');
const Word = require('../models/Word');
const router = express.Router();

const middleware = require('../middleware/index');

router.post('/index/:id/words', middleware.checkListOwnership, (req, res) => {
    List.findById(req.params.id, async (err, list) => {
      if(err) {
        console.log(err);
      } else {
        let word = new Word(req.body.word);
        word.save();
        list.words.push(word);
        await list.save();
        res.redirect(`/index/${list._id}`);
      }
    });
  });

  router.put('/index/:id/words/:wordId', middleware.checkListOwnership, (req, res) => {
    Word.findByIdAndUpdate(req.params.wordId, req.body.word, function(err, word) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/index/"+req.params.id);
        }
    })
  });

  router.delete('/index/:id/words/:wordId', middleware.checkListOwnership, (req, res) => {
    Word.findByIdAndRemove(req.params.wordId, function(err, word) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/index/"+req.params.id);
        }
    })
  });

  module.exports = router;