const { catchError } = require("../../helpers/helper");

async function getDashboard(req, res, next) {
  try {
    res.render("dashboard/dashboard", {
      title: "dashboard",
      notification: req.flash("notification")[0],
      errorsValidation: req.flash("errorsValidation")[0],
      adminData: req.cookies.Admin,
    });
  } catch (error) {
    catchError(next, error);
  }
}

async function languageControlle(req, res, next) {
  try {
    res.cookie("lang", req.params.lang);
    res.send("success");
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  getDashboard,
  languageControlle,
};
