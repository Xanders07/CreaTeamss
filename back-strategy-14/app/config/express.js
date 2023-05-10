const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

function expressConfig() {
  const app = express();

  // Set up middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set up routes
  

  return app;
};

module.exports = expressConfig;