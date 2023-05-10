const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const createUserModel = require('./user-model.js');
const createProjectModel = require('./project-model.js');

const User = createUserModel(sequelize, Sequelize);
const Project = createProjectModel(sequelize, Sequelize);

const db = {
  User,
  Project,
  sequelize, 
};

db.user = createUserModel(sequelize, Sequelize);
db.project = createProjectModel(sequelize, Sequelize);

// db.user.belongsToMany(db.project, { through: 'UsersProjects' });
// db.project.belongsToMany(db.user, { through: 'UsersProjects' });

db.user.belongsToMany(db.project, {
  through: "UsersProjects",
  foreignKey: "user_id",
});

db.project.belongsToMany(db.user, {
  through: "UsersProjects",
  foreignKey: "project_id",
});

console.log(Project)
module.exports = db;
