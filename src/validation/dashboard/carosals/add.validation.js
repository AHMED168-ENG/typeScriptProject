const { check } = require("express-validator");

function addCarosalValidation() {
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
    check("header_ar")
      .notEmpty()
      .withMessage("you should enter header with arabic")
      .trim()
      .escape()
      .toLowerCase(),
    check("header_en")
      .notEmpty()
      .withMessage("you should enter header with english")
      .trim()
      .escape()
      .toLowerCase(),
    check("link_name_ar")
      .notEmpty()
      .withMessage("you should enter link name with arabic")
      .trim()
      .escape()
      .toLowerCase(),
    check("link_name_en")
      .notEmpty()
      .withMessage("you should enter link name with english")
      .trim()
      .escape()
      .toLowerCase(),

    check("image")
      .custom((value, { req }) => {
        if (req.files.length == 0) {
          throw new Error("");
        }
        return true;
      })
      .withMessage("ادخل الصوره الخاصه بالكاروسال")
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
      .withMessage(`يجب ان يكون امتداد الصور jpg , jpeg , png , gif , svg`)
      .custom(async (value, { req }) => {
        if (!req.files.length) return true;
        req.files.forEach((element) => {
          if (element.size > 2000000) {
            throw new Error("");
          }
        });
      })
      .withMessage("الصوره يجب الا تزيد عن 2000000 kb"),
  ];
}

module.exports = {
  addCarosalValidation,
};
