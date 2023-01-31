const { check } = require("express-validator");

function editInstructorValidation() {
  return [
    check("name")
      .notEmpty()
      .withMessage("you should enter instructor name")
      .trim()
      .escape()
      .toLowerCase(),
    check("jop_ar")
      .notEmpty()
      .withMessage("you should enter jop name in arabic")
      .trim()
      .escape()
      .toLowerCase(),
    check("jop_en")
      .notEmpty()
      .withMessage("you should enter jop name in english")
      .trim()
      .toLowerCase(),
    check("facebook_link")
      .notEmpty()
      .withMessage("you should enter facebook link")
      .trim()
      .toLowerCase(),
    check("twitter_link")
      .notEmpty()
      .withMessage("you should enter twitter link")
      .trim()
      .toLowerCase(),
    check("instagram_link")
      .notEmpty()
      .withMessage("you should enter instagram link")
      .trim()
      .toLowerCase(),
    check("image")
      .custom(async (value, { req }) => {
        if (!req.files.length) return true;
        req.files.forEach((element) => {
          var arrayExtention = ["jpg", "png", "jpeg", "gif", "svg"];
          var originalname = element.originalname.split(".");
          var imgExtension =
            originalname[originalname.length - 1].toLowerCase();
          if (!arrayExtention.includes(imgExtension)) {
            throw new Error("");
          }
        });
      })
      .withMessage(
        `image extention should be between jpg , jpeg , png , gif , svg`
      )
      .custom(async (value, { req }) => {
        if (!req.files.length) return true;
        req.files.forEach((element) => {
          if (element.size > 2000000) {
            throw new Error("");
          }
        });
      })
      .withMessage("image should not be more than 2000000 kb"),
  ];
}

module.exports = {
  editInstructorValidation,
};
