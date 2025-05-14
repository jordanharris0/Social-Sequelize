const { Sequelize, db, DataTypes, Model } = require("../db/connection.js");

class Like extends Model {}

Like.init(
  {
    reactionType: DataTypes.STRING,
    createdAt: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Like",
    timestamps: false,
  }
);

module.exports = Like;
