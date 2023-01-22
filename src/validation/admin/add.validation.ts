import { check } from "express-validator";

export class addAdminValidation {
  constructor() {}
  validation() {
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
      check("age").notEmpty().withMessage("يجب ادخال العمر").trim().escape(),
      check("email")
        .notEmpty()
        .withMessage("يجب ادخال الايميل")
        .trim()
        .escape()
        .toLowerCase()
        .isEmail()
        .withMessage("هذا الحقل يستقبل ايميل فقط"),
      check("mobile")
        .notEmpty()
        .withMessage("يجب ادخال الموبايل الخاص بك")
        .trim()
        .escape(),
      check("password")
        .notEmpty()
        .withMessage("يجب ادخال الرقم السري")
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage("يجب الا يزيد الرقم السري عن 15 رقم و لا يقل عن 10 ارقام")
        .custom((value, { req }) => {
          let count = 0;
          value.split("").forEach((element: number) => {
            console.log(element);
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
      check("image")
        .custom((value, { req }) => {
          if (req.files.length == 0) {
            throw Error("");
          }
          return true;
        })
        .withMessage("يجب الحاق صوره للادمن"),
    ];
  }
}
