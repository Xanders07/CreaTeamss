const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

// Get user data by Id
router.route("/:id").get(function(req, res) {
  userController.getCurrentUser(req, res);
});

// Get projects of user, by mail
router.route("/projects/:identifiant").get(function(req, res) {
  userController.getProjectsByUser(req, res);
});

// Create new user
router.route("/").post(function(req, res) {
  userController.createUser(req.body, res);
});

module.exports = router;