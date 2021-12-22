module.exports = (sequelize, DataTypes) => {
  const Anomalies = sequelize.define("Anomalies", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Anomalies.associate = (models) => {
    Anomalies.belongsToMany(models.Tickets, {
      through: "Defaillances",
      foreignKey: "anomalyID",
      allowNull: false,
    });
  };

  return Anomalies;
};
