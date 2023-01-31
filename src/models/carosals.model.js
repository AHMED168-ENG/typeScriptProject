const DatabaseConfig = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(DatabaseConfig);
const tbl_carosals = sequelize.define(
  "tbl_carosals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    title_ar: { type: DataTypes.STRING, allowNull: false },
    title_en: { type: DataTypes.STRING, allowNull: false },
    header_ar: { type: DataTypes.STRING, allowNull: false },
    header_en: { type: DataTypes.STRING, allowNull: false },
    link_name_ar: { type: DataTypes.STRING, allowNull: false },
    link_name_en: { type: DataTypes.STRING, allowNull: false },
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
  { charset: "utf8", collate: "utf8_general_ci" }
);
tbl_carosals.sync();
module.exports = {
  tbl_carosals,
};
