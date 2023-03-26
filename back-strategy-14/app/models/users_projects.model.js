module.exports = (sequelize, Sequelize) => {
    const UsersProjects = sequelize.define("usersprojects", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        }
      },
      projects_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Project',
          key: 'id',
        }
      },
    });

    return UsersProjects;
  };