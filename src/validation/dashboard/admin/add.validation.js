const { check } = require("express-validator");
const { Op } = require("sequelize");
const { tbl_admins } = require("../../../models/admin.model");

function addAdminValidation() {
  return [
    check("fName")
      .notEmpty()
      .withMessage("يجب ادخال الاسم الاول")
      .trim()
      .escape()
      .toLowerCase(),
    check("lName")
      .notEmpty()
      .withMessage("يجب ادخال الاسم الاخير")
      .trim()
      .escape()
      .toLowerCase(),
    check("age")
      .isNumeric()
      .withMessage("يجب ادخال رقم")
      .notEmpty()
      .withMessage("يجب ادخال العمر")
      .trim()
      .escape(),
    check("addres")
      .isString()
      .withMessage("هذا الحقل يستقبل نص")
      .notEmpty()
      .withMessage("يجب ادخال العنوان")
      .trim()
      .escape(),
    check("email")
      .notEmpty()
      .withMessage("يجب ادخال الايميل")
      .trim()
      .escape()
      .toLowerCase()
      .isEmail()
      .withMessage("هذا الحقل يستقبل ايميل فقط")
      .custom((value, { req }) => {
        return tbl_admins
          .findOne({
            where: {
              email: {
                [Op.eq]: value,
              },
            },
          })
          .then((result) => {
            if (result) {
              return Promise.reject("E-mail already in use");
            } else {
              return true;
            }
          });
      })
      .withMessage("هذا الايميل مسجل بالفعل"),
    check("mobile")
      .isString()
      .notEmpty()
      .withMessage("يجب ادخال الموبايل الخاص بك")
      .trim()
      .escape(),
    check("password")
      .notEmpty()
      .withMessage("يجب ادخال الرقم السري")
      .trim()
      .isLength({ min: 10, max: 25 })
      .withMessage("يجب الا يزيد الرقم السري عن 20 رقم و لا يقل عن 10 ارقام")
      .custom((value, { req }) => {
        let count = 0;
        value.split("").forEach((element) => {
          if (isNaN(element)) {
            count++;
          }
        });
        if (count < 5) {
          throw Error("");
        }
        return true;
      })
      .withMessage("يجب ان يكون الرقم السري مكون من خمس احرف علي الاقل"),
    check("confirmPassword").custom((value, { req }) => {
      if (value != req.body.password) {
        throw Error("يجب ان يكون الرقم السري متطابق");
      }
      return true;
    }),
    check("image")
      .custom((value, { req }) => {
        if (req.files.length == 0) {
          throw new Error("");
        }
        return true;
      })
      .withMessage("ادخل الصوره الخاصه بالادمن")
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
  addAdminValidation,
};
