const { Sequelize, db, DataTypes, Model } = require("../db/connection.js");

class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Comment",
  }
);

module.exports = User;
