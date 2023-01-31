const DatabaseConfig = require("../config/sequelize.config");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(DatabaseConfig);
const tbl_offers = sequelize.define(
  "tbl_offers",
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
    body_ar: { type: DataTypes.STRING, allowNull: false },
    body_en: { type: DataTypes.STRING, allowNull: false },
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
tbl_offers.sync();
module.exports = {
  tbl_offers,
};
