const db = require('../models/index.js');
const { ProjectDTO, UserDto } = require('../DTO/user.dto.js');

const User = db.user;
const Op = db.sequelize.Op;

const userController = { 
  
  getCurrentUser: async (req, res) => {
    const id = req.params?.id;

    User.findByPk(id, {include: db.Project}).then(user => {

      // init the list of project user by id
      const projectData = user.projects.map(project => new ProjectDTO(
        project.id,
        project.project_name,
        project.description
      ));
      
      const userData = new UserDto(
        user.pseudo,
        user.mail,
        user.surname,
        user.name,
        user.premium,
        projectData
      );
      
        console.log(userData);
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
          err.message || 'Error retrieving Tutorial with id=' + id
        })
      });
  },
    
  
  getUserById: (req, res) => {

  },

  createUser: (userData, res) => {
    
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
  },

  // à verifier ( fonction de connection je l'apelle dans server.js) 
verifyUser: (userData, res) =>  {

  const { pseudo, password } = userData;

 
  User.findOne({
      where: { pseudo, password } 
  })
  .then(data => {
      if (data) {
          
          res.send(data); 
      } else {
        
          res.status(404).send({
              message: 'No user found with these credentials.'
          });
      }
  })
  .catch(err => {
      res.status(500).send({
          message: err.message || 'Some error occurred while retrieving user.'
      });
  });
 }


}


module.exports = userController;


