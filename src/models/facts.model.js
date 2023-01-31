const DatabaseConfig = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(DatabaseConfig);
const tbl_facts = sequelize.define(
  "tbl_facts",
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
    numberOfFact: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
tbl_facts.sync();
module.exports = {
  tbl_facts,
};
