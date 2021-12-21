module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("Roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Roles;
};
