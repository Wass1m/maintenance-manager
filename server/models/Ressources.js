module.exports = (sequelize, DataTypes) => {
  const Ressources = sequelize.define("Ressources", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localisation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Ressources.associate = (models) => {
    Ressources.belongsTo(models.Users, {
      onDelete: "cascade",
      foreignKey: {
        name: "responsableID",
        allowNull: false,
      },
    });
    Ressources.hasMany(models.Anomalies, {
      onDelete: "cascade",
      foreignKey: {
        name: "ressourceID",
        allowNull: false,
      },
    });
  };

  return Ressources;
};
