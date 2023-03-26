module.exports = app => {
    const userControl = require('../controllers/user.controller.js');

    var express = require('express');
    var router = express.Router();

    // Get user data by Id
    router.route("/:id").get(function(req, res) {
       userControl.getCurrentUser(req, res);
    });

    // Create new user
    router.route("/").post(function(req, res) {
       userControl.createUser(req.body, res);
    });

   //  router.post("/", userControl.createUser) 

    app.use('/api/user', router)
      
}