const { check } = require("express-validator");
const { Op } = require("sequelize");
const { tbl_admins } = require("../../../models/admin.model");

function signInDashboard() {
  return [
    check("email")
      .notEmpty()
      .withMessage("يجب ادخال الايمبل")
      .isEmail()
      .withMessage("هذا الحقل يستقبل ايميل")
      .trim()
      .escape()
      .toLowerCase(),
    check("password")
      .notEmpty()
      .withMessage("يجب ادخال الرقم السري")
      .trim()
      .escape()
      .toLowerCase(),
  ];
}

module.exports = {
  signInDashboard,
};
