const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

// Get user data by Id
router.route("/getUserById/:id").get(function(req, res) {
  userController.getProjectsDataUser(req, res);
});

// check if mail and password exist, and return userData
router.route("/connect/:mail/:password").get(function(req, res) {
  userController.connexionUser(req.params, res);
});

// Create new user
router.route("/").post(function(req, res) {
  userController.createUser(req.body, res);
});

// Modif user in DB
router.route("/").put(function(req, res) {
  userController.updateUser(req, res);
});

// Delete user in DB
router.route("/").delete(function(req, res) {
  userController.deleteUser(req, res);
});



module.exports = router;