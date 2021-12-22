module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define("Tickets", {
    solved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultType: false,
    },
  });

  Tickets.associate = (models) => {
    Tickets.belongsTo(models.Ressources, {
      onDelete: "cascade",
      foreignKey: {
        name: "ressourceID",
        allowNull: false,
      },
    });
    Tickets.belongsTo(models.Users, {
      onDelete: "cascade",
      foreignKey: {
        name: "userID",
        allowNull: true,
      },
    });
    Tickets.belongsToMany(models.Anomalies, {
      through: "Defaillances",
      foreignKey: "ticketID",
      allowNull: false,
    });
  };

  return Tickets;
};
