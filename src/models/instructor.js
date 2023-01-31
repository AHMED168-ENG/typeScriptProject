const DatabaseConfig = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(DatabaseConfig);
const tbl_instructor = sequelize.define(
  "tbl_instructor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    jop_ar: { type: DataTypes.STRING, allowNull: false },
    jop_en: { type: DataTypes.STRING, allowNull: false },
    facebook_link: { type: DataTypes.STRING, allowNull: false },
    twitter_link: { type: DataTypes.STRING, allowNull: false },
    instagram_link: { type: DataTypes.STRING, allowNull: false },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    charset: "utf8",
    collate: "utf8_general_ci",
    scopes: {
      active: {
        where: {
          active: true,
        },
      },
    },
  }
);
tbl_instructor.sync();
module.exports = {
  tbl_instructor,
};
