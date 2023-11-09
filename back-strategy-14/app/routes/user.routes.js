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

// Connect user
router.route("/connect/:pseudoOrEmail/:password").get(function(req, res) {
  userController.connectUser(req.params, res);
});

// Create new user
router.route("/").post(function(req, res) {
  userController.createUser(req.body, res);
});

// Modif user in DB
router.route("/").put(function(req, res) {
  userController.updateUser(req, res);
});

// Modif user in DB
router.route("/").delete(function(req, res) {
  userController.deleteUser(req, res);
});



module.exports = router;