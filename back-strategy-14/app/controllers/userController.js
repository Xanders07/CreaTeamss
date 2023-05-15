const db = require('../models/index.js');
const { ProjectDTO, UserDto, UserProjectListDTO } = require('../DTO/user.dto.js');

const User = db.user;
const Op = db.sequelize.Op;

const userController = { 
  
  getCurrentUser: async (req, res) => {
    const id = req.params?.id;

    User.findByPk(id, {
      include: db.Project})
      .then(user => {

        // init the list of project user by id
        const projectData = user.projects.map(project => new ProjectDTO(
          project.id,
          project.project_name,
          project.description,
          project.createdAt
        ));
        
        const userData = new UserDto(
          user.pseudo,
          user.mail,
          user.surname,
          user.name,
          user.premium,
          user.createdAt,
          projectData
        );
      
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
    
  
  getUserById: async(req, res) => {

  },
  
  getProjectsByUser: async (req, res) => {
    const identifiant = req.params.identifiant;
    
    User.findOne({
      where: {mail: identifiant},
      include: db.Project
    })
      .then(userData => {
    
        // init the list of project user by id
        const projects = userData.projects.map(project => new UserProjectListDTO(
          project.id,
          project.project_name,
          project.description,
          project.createdAt
        ));

        res.json(projects);
      })
      .catch(err => {
        // Gérez les erreurs
        console.error(err);
      });


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
  }
}

module.exports = userController;


