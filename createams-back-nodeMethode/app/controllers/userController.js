// Externall Require

const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
// internal Require
const db = require('../models/index.js');
const { ProjectDTO,
  UserDTO,
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

  // Get all infos User Data
  getProjectsDataUser: async (req, res) => {
    const id = req.params?.id;

    User.findByPk(id, {
      include: db.Project
    })
      .then(user => {
        const userData = {
          id: user.id,
          pseudo: user.pseudo,
          mail: user.mail,
          surname: user.surname,
          name: user.name,
          premium: user.premium,
          job: user.job,
          image: user.image,
          mentor: user.mentor,
          projects: user.projects
        };
        
        res.json( userData );
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || 'Error retrieving Tutorial with id=' + id
        })
      });
  },

  // get connexion for user with 
  connexionUser: async (req, res) => {
   
    const mail = req?.body?.mail || req?.mail;
    const password = req?.body?.password || req?.password;
   
    try {
      const existingUser = await findUserByIdOrEmail(null, mail);
    
      if (!existingUser) {
        return res.status(400).json({ message: 'Utilisateur non trouvé' });
      }

      bcrypt.compare(password, existingUser.password, async (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la comparaison des mots de passe' });
        }

        if (result) {          
          return res.status(200).json(existingUser);
        } else {

          return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la tentative de connexion' });
    }
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
  deleteUser: async (req, res) => {

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