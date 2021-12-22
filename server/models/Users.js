module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.belongsTo(models.Roles, {
      onDelete: "cascade",
      foreignKey: {
        name: "role",
      },
      targetKey: "name",
    });

    Users.hasMany(models.Anomalies, {
      onDelete: "NO ACTION",
      foreignKey: {
        name: "userID",
        allowNull: true,
      },
    });
  };

  return Users;
};
