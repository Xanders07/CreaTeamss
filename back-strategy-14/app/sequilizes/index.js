const dbConfig = require("../config/db.config");

// Mappage des model avec le SGBD
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.project = require("../models/project.model")(sequelize, Sequelize);

db.user.belongsToMany(db.project, { through: 'UsersProjects' });
db.project.belongsToMany(db.user, { through: 'UsersProjects' });

// Liaison table
db.UsersProjects = require("../models/users_projects.model")(sequelize, Sequelize);

db.UsersProjects.belongsTo(db.user);
db.UsersProjects.belongsTo(db.project);

module.exports = db;