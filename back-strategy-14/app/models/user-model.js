module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      surname: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      mail: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      premium: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
    }
    );
  
    return User;
  };