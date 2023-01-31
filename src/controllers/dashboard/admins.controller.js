const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  catchError,
  returnWithMessage,
  handel_validation_errors,
  handel_validationImage_errors,
  removeImg,
  Rename_uploade_img,
} = require("../../helpers/helper");
const { tbl_admins } = require("../../models/admin.model");

// start show all admins page
async function showAllAdmins(req, res, next) {
  try {
    tbl_admins.findAll().then((result) => {
      res.render("dashboard/admins/allAdmins", {
        title: "All Admins",
        notification: req.flash("notification")[0],
        admins: result,
        adminData: req.cookies.Admin,
      });
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end show all admins page

// start add admins page
async function addAdmin(req, res, next) {
  try {
    tbl_admins
      .findAll()
      .then((result) => {
        res.render("dashboard/admins/addAdmin", {
          title: "Add Admin",
          notification: req.flash("notification")[0],
          validationError: req.flash("validationError")[0],
          bodyData: req.flash("bodyData")[0] || {},
          adminData: req.cookies.Admin,
          admins: result,
        });
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add admins page

// start add admin post
async function addAdminPost(req, res, next) {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Admins");
      handel_validation_errors(req, res, Errors.errors, "/dashboard/addAdmin");
      return;
    }

    const files = Rename_uploade_img(req);
    let body = req.body;
    body.active = body.active ? true : false;
    body.image = files;
    bcrypt
      .hash(body.password, +process.env.saltRounds)
      .then((hashed) => {
        body.password = hashed;
        return tbl_admins.create(body);
      })
      .then((result) => {
        returnWithMessage(
          req,
          res,
          "/dashboard/addAdmin",
          "add successful",
          "success"
        );
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add admin post

// start add admins page
async function editAdmin(req, res, next) {
  try {
    tbl_admins
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.render("dashboard/admins/editAdmin", {
          title: "Add Admin",
          notification: req.flash("notification")[0],
          validationError: req.flash("validationError")[0],
          bodyData: req.flash("bodyData")[0],
          adminData: req.cookies.Admin,
          admin: result,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add admins page

// start add admin post
async function editAdminPost(req, res, next) {
  try {
    let body = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Admins");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/editAdmin/" + req.params.id
      );
      return;
    }

    const files = Rename_uploade_img(req);
    if (files) {
      removeImg(req, "Admins", req.body.oldImage);
      body.image = files;
    } else {
      body.image = req.body.oldImage;
    }
    if (req.body.password) {
      body.password = bcrypt.hashSync(
        req.body.password,
        +process.env.saltRounds
      );
    } else {
      req.body.oldPassword;
    }
    body.active = body.active ? true : false;
    tbl_admins
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        returnWithMessage(
          req,
          res,
          "/dashboard/editAdmin/" + req.params.id,
          "Edit Successful",
          "success"
        );
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add admin post

// start admin activate
async function activeAdmin(req, res, next) {
  try {
    let adminStatus = req.body.adminStatus;
    tbl_admins.update(
      {
        active: adminStatus == "true" ? false : true,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    returnWithMessage(
      req,
      res,
      "/dashboard/allAdmins",
      adminStatus == "true"
        ? "your admin is not active"
        : "your admin is active",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end admin activate

// start delete admin
async function deleteAdmin(req, res, next) {
  try {
    removeImg(req, "Admins", req.body.image);
    tbl_admins.destroy({
      where: {
        email: req.body.email,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashboard/allAdmins",
      "delete success",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end delete admin

module.exports = {
  showAllAdmins,
  addAdmin,
  addAdminPost,
  editAdmin,
  editAdminPost,
  activeAdmin,
  deleteAdmin,
};
