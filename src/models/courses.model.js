const DatabaseConfig = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(DatabaseConfig);
const tbl_course = sequelize.define(
  "tbl_course",
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
    description_ar: { type: DataTypes.TEXT("long") },
    description_en: { type: DataTypes.TEXT("long") },
    body_ar: {
      type: DataTypes.TEXT("long"),
    },
    body_en: {
      type: DataTypes.TEXT("long"),
    },
    price: { type: DataTypes.STRING, allowNull: false },
    dayOfCourse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    divesOnly: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeOfCourse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
tbl_course.sync();
module.exports = {
  tbl_course,
};
