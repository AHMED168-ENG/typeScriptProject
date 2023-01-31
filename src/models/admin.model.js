const DatabaseConfig = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(DatabaseConfig);
const tbl_admins = sequelize.define(
  "tbl_admins",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    fName: { type: DataTypes.STRING, allowNull: false },
    lName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.STRING, allowNull: true },
    addres: { type: DataTypes.STRING, allowNull: true },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    gender: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      comment: "0 meen woman 1 meen man",
    },
    role: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      comment: "0 meen admin 1 super admin",
    },
  },
  { charset: "utf8", collate: "utf8_general_ci" }
);
tbl_admins.sync();
module.exports = {
  tbl_admins,
};
