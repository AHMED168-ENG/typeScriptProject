"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("tbl_admins", {
      fName: "عدم القدره علي نطق حرف الباء",
      lName: "عدم القدره علي نطق حرف الباء",
      image: "0.8872712864440218img.PNG--",
      age: 22,
      email: "ahmed@admin.com",
      password: bcrypt.hashSync("01024756410ahmed", process.env.saltRounds),
      mobile: "01024756410",
      gender: 1,
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
