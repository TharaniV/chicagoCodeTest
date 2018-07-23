const express = require('express');
const app = express();
const displayRoutes = require('./api/routes/display');

app.set('json spaces', 4);
app.use('/display', displayRoutes);

app.get('/', function(req, res) {
  var responseText =
    '<h1>Hello there!</h1><br><small>please access the resource display (in the URL) </small>';
  res.send(responseText);
});

module.exports = app;
