const express = require("express");

var app = express();

app.get("/", function(req, res) {
    res.send("Home page!");
});

app.listen(3000, () => {
    console.log("The server has started!");
});