const db = require("../sequilizes/index");
const User = db.user;
const Op = db.sequelize.Op;

exports.getUserById = (req, res) => {

}

exports.getCurrentUser = (req, res) => {
  const id = req.params?.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || 'Error retrieving Tutorial with id=' + id
      })
    });
}

exports.createUser = (userData, res) => {

  const user = {
    pseudo: userData.pseudo,
    password: userData.password,
    mail: userData.mail,
  }

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || 'Some error occured while creating the User'
      })
    });
};

