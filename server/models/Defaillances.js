module.exports = (sequelize, DataTypes) => {
  const Defaillances = sequelize.define("Defaillances", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Defaillances;
};
