const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const User = require('./user.model')(sequelize, Sequelize);
const Project = require('./project.model')(sequelize, Sequelize);

const db = {
  User,
  Project,
  sequelize, 
};

db.user = require("./user.model")(sequelize, Sequelize);
db.project = require("./project.model")(sequelize, Sequelize);

db.user.belongsToMany(db.project, { through: 'UsersProjects' });
db.project.belongsToMany(db.user, { through: 'UsersProjects' });


module.exports = db;