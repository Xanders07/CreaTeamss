// Externall Require

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
// internal Require
const db = require('../models/index.js');
const { ProjectDTO, 
        UserDto, 
        UserProjectListDTO, 
        UserCreateDTO,
        UserUpdateDTO
      } = require('../DTO/user.dto.js');

const User = db.user;

// check is user exist
const findUserByIdOrEmail = async (id, email) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { id: id },
          { mail: email }
        ]
      }
    });

    return user;
  } catch (error) {
    throw new Error('Utilisateur ou Email inexistant');
  }
};

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
          
    User.findByPk(data.dataValues.id)
    .then(user => {
      if (user) {
        userExist = user;
        console.log(userExist);
      }
    })
    .catch(err => console.log(err));
    

  },

  // Create an user
  createUser: async (req, res) => {
    try {
      const pseudo = req?.body?.pseudo || req?.pseudo;
      const password = req?.body?.password || req?.password;
      const mail = req?.body?.mail || req?.mail;
      const premiumDefault = 0;

      const existingUser = await findUserByIdOrEmail(null, mail);

      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà existant' });
      }

      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: 'Error hashing the password' });
        }

        const userData = new UserCreateDTO(pseudo, mail, hash, premiumDefault);

        try {
          const createdUser = await User.create(userData);

          const userDataCookies = {
            id: createdUser.dataValues.id || '',
            pseudo: createdUser.dataValues.pseudo || '',
          };

          res.cookie('user', JSON.stringify(userDataCookies), {
            maxAge: 10800,
            path: '/',
            httpOnly: false,
          });

          return res.status(200).json({ message: JSON.stringify(userDataCookies) });
        } catch (error) {
          return res.status(500).json({ message: 'Une erreur est survenu lors de la création du compte' });
        }
      });
      
    } catch (error) {
      return res.status(500).json({ message: 'Error finding user or creating the user' });
    }
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


