const { check } = require("express-validator");

function addFactValidation() {
  return [
    check("title_ar")
      .notEmpty()
      .withMessage("you should enter title with arabic")
      .trim()
      .escape()
      .toLowerCase(),
    check("title_en")
      .notEmpty()
      .withMessage("you should enter title with english")
      .trim()
      .escape()
      .toLowerCase(),
    check("numberOfFact")
      .isNumeric()
      .withMessage("this filed accept number only")
      .notEmpty()
      .withMessage("you should enter the number of this fact")
      .trim()
      .escape(),
  ];
}

module.exports = {
  addFactValidation,
};
