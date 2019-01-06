const express = require('express');
const listsRouter = require('./routes/lists');

const app = express();
app.set('view engine', 'ejs');
app.use('/', listsRouter);

app.listen(3000, () => {
  console.log('The server has started!');
});
