const { Sequelize, db, DataTypes, Model } = require("../db/connection.js");

class Profile extends Model {}

Profile.init(
  {
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthday: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Like",
  }
);

module.exports = Profile;
