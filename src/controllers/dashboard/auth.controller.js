const {
  catchError,
  returnWithMessage,
  handel_validationImage_errors,
  handel_validation_errors,
} = require("../../helpers/helper");
const { tbl_admins } = require("../../models/admin.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

// start login page
async function loginDashboardPage(req, res, next) {
  res.render("dashboard/auth/signIn", {
    title: "sign in",
    notification: req.flash("notification")[0],
    validationError: req.flash("validationError")[0],
    bodyData: req.flash("bodyData")[0],
  });
  try {
  } catch (error) {
    catchError(next, error);
  }
}
// end login page

// start login post
async function loginDashboardPost(req, res, next) {
  const Errors = validationResult(req).errors;
  if (Errors.length > 0) {
    handel_validation_errors(req, res, Errors, "/dashboard/loginPage");
    return;
  }
  tbl_admins
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((result) => {
      if (!result) {
        returnWithMessage(
          req,
          res,
          "/dashboard/loginPage",
          "هذا الايميل غير صحيح",
          "danger"
        );
      } else {
        if (!result.active) {
          returnWithMessage(
            req,
            res,
            "/dashboard/loginPage",
            "تم الغاء تفعيلك من السوبر ادمن",
            "danger"
          );
        } else {
          bcrypt.compare(
            req.body.password,
            result.password,
            (error, compering) => {
              if (!compering) {
                returnWithMessage(
                  req,
                  res,
                  "/dashboard/loginPage",
                  "الرقم السري اللذي ادخلته غير صحيح",
                  "danger"
                );
              } else {
                var expire = !req.body.rememberMe ? { maxAge: 86400000 } : {};
                var message = req.body.rememberMe
                  ? "تم تسجيل الدخول بنجاح"
                  : "تم تسجيل الدخول بنجاح " +
                    "سوف يتم تسجيل خروجك من الموقع بعد 24 ساعه من دخولك";
                res.cookie(
                  "Admin",
                  {
                    id: result.id,
                    email: result.email,
                    fName: result.fName,
                    lName: result.lName,
                    image: result.image,
                  },
                  expire
                );
                returnWithMessage(req, res, "/dashboard/", message, "success");
              }
            }
          );
        }
      }
    });
  try {
  } catch (error) {
    catchError(next, error);
  }
}
// end login post

// start log out post
async function logoutDashboardPost(req, res, next) {
  try {
    console.log("ahmed reda alsahed");
    res.clearCookie("Admin");
    res.redirect("/dashboard/loginPage");
  } catch (error) {
    catchError(next, error);
  }
}
// end log out post

module.exports = {
  loginDashboardPage,
  loginDashboardPost,
  logoutDashboardPost,
};
