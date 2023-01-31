const { check } = require("express-validator");

function editOffersValidation() {
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
    check("body_ar")
      .notEmpty()
      .withMessage("you should enter offer content with arabic")
      .custom((value, { req }) => {
        if (value.length > +process.env.offerLength + 7) {
          throw new Error("");
        }
        return true;
      })
      .withMessage(
        `your length should be lese or equal ${+process.env.offerLength}`
      )
      .trim()
      .escape()
      .toLowerCase(),
    check("body_en")
      .notEmpty()
      .withMessage("you should enter offer content with english")
      .custom((value, { req }) => {
        if (value.length > +process.env.offerLength + 7) {
          throw new Error("");
        }
        return true;
      })
      .withMessage(
        `your length should be lese or equal ${+process.env.offerLength}`
      )
      .trim()
      .escape()
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
  editOffersValidation,
};
