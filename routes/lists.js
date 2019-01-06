const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing');
});
router.get('/index', (req, res) => {
  res.render('index');
});

module.exports = router;
