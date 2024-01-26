export default (sequelize, Sequelize) => {
    const UsersProjects = sequelize.define("usersprojects", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      users_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_id',
          key: 'id',
        }
      },
      projects_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'project_id',
          key: 'id',
        }
      },
    });

    return UsersProjects;
  };