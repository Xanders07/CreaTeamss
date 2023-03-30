const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function() {
  const app = express();

  // Set up middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set up routes
  

  return app;
};