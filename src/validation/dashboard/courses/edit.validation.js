const { check } = require("express-validator");

function editCoursesValidation() {
  return [
    check("title_ar")
      .notEmpty()
      .withMessage("يجب ادخال العنوان بالعربي")
      .trim()
      .escape()
      .toLowerCase(),
    check("title_en")
      .notEmpty()
      .withMessage("يجب ادخال العنوان بالانجليزي")
      .trim()
      .escape()
      .toLowerCase(),
    check("description_ar")
      .notEmpty()
      .withMessage("يجب ادخال الوصف بالعربي")
      .trim()
      .escape(),
    check("description_en")
      .notEmpty()
      .withMessage("يجب ادخال الوصف بالانجليزي")
      .trim()
      .escape(),
    check("price")
      .notEmpty()
      .withMessage("يجب ادخال سعر الكورس")
      .trim()
      .escape()
      .toLowerCase(),
    check("body_ar")
      .notEmpty()
      .withMessage("يجب ادخال محتوي الكورس بالعربي")
      .trim()
      .escape(),
    check("body_en")
      .notEmpty()
      .withMessage("يجب ادخال محتوي الكورس بالانجليزي")
      .trim()
      .escape(),
    check("dayOfCourse")
      .notEmpty()
      .withMessage("يجب ادخال عدد ايام الكورس")
      .trim()
      .escape(),
    check("divesOnly")
      .notEmpty()
      .withMessage("يجب ادخال عدد ايام الغوص")
      .trim()
      .escape(),
    check("typeOfCourse")
      .notEmpty()
      .withMessage("يجب ادخال نوع الكورس")
      .trim()
      .escape(),
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
  editCoursesValidation,
};
