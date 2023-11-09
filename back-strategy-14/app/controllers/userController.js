// Externall Require

const bcrypt = require('bcrypt');

// internal Require
const db = require('../models/index.js');
const { ProjectDTO, 
        UserDto, 
        UserProjectListDTO, 
        UserCreateDTO,
        UserUpdateDTO
      } = require('../DTO/user.dto.js');

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

  // Get user by id
  getUserById: async(req, res) => {

  },

  // Create an user
  createUser: (req, res) => {
    const pseudo = req?.body?.pseudo || req?.pseudo;
    const password = req?.body?.password || req?.password;
    const mail = req?.body?.mail || req?.mail;
    const premiumDefault = 0;

    const userData = new UserCreateDTO(
      pseudo,
      password,
      mail,
      premiumDefault
    );

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        userData.password = hash; // Remplacez le mot de passe en clair par le hachage
        
        // Enregistrez les données de l'utilisateur en base de données (par exemple, avec un modèle Mongoose si vous utilisez MongoDB)
        User.create(userData)
        .then(data => {
          
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the User'
          });
        });
      }
    });


  },
  

  // Update an User
  updateUser: (req, res) => {
    const pseudo = req?.body?.pseudo || req?.pseudo;
    const password = req?.body?.password || req?.password;
    const mail = req?.body?.mail || req?.mail;
    const name = req?.body?.name || req?.name;
    const surname = req?.body?.surname || req?.surname;


    const userData = new UserUpdateDTO(
      pseudo,
      password,
      mail,
      name,
      surname
    );
  
    User.create(userData)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the User'
        });
      });
  },
  

  // Get user by id
  deleteUser: async(req, res) => {
    
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      
      await user.destroy();
      
      res.send({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error deleting user' });
    }

  },
  
}

module.exports = userController;


