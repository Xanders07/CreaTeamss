module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define("project", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      users_id: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT,
      },
    }
  );

  return Project;
};