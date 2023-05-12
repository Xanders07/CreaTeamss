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
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // conversion de la date format fr ? à revoir ou optimiser ? methode du galérien //
        get() {
          const date = this.getDataValue('createdAt');
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return date.toLocaleDateString('fr-FR', options);
        },
        set(value) {
          const date = new Date(value);
          this.setDataValue('createdAt', date);
        },
      }
      
      
    }
  );

  return Project;
};