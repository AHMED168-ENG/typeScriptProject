import { DatabaseConfig } from "../config/sequelize.config";
import { Sequelize, DataTypes } from "sequelize";
console.log("alsahed");

const sequelize = new Sequelize(DatabaseConfig);
const tbl_admins = sequelize.define(
  "tbl_admins",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fName: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    lName: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    age: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    gender: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
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
export default tbl_admins;
