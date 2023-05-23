const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();


router.route("/:id").get(function(req, res) {
  userController.getCurrentUser(req, res);
});


router.route("/").post(function(req, res) {
  userController.createUser(req.body, res);
});

module.exports = router;