const { validationResult } = require("express-validator");
const {
  catchError,
  returnWithMessage,
  handel_validation_errors,
  removeImg,
  Rename_uploade_img,
} = require("../../helpers/helper");
const { tbl_carosals } = require("../../models/carosals.model");

// start show all carosals page
async function showAllcarosals(req, res, next) {
  try {
    tbl_carosals.findAll().then((result) => {
      res.render("dashboard/carosals/allcarosals", {
        title: "All carosals",
        notification: req.flash("notification")[0],
        carosals: result,
        adminData: req.cookies.Admin,
      });
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end show all carosals page

// start add carosals page
async function addCarosal(req, res, next) {
  try {
    res.render("dashboard/carosals/addCarosal", {
      title: "Add Admin",
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      bodyData: req.flash("bodyData")[0] || {},
      adminData: req.cookies.Admin,
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add carosal page

// start add carosal post
async function addCarosalPost(req, res, next) {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "carosals");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/addCarosal"
      );
      return;
    }

    const files = Rename_uploade_img(req);
    let body = req.body;
    body.active = body.active ? true : false;
    body.image = files;
    tbl_carosals.create(body).then((result) => {
      returnWithMessage(
        req,
        res,
        "/dashboard/addCarosal",
        "add successful",
        "success"
      );
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add carosal post

// start add carosal page
async function editCarosal(req, res, next) {
  try {
    tbl_carosals
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.render("dashboard/carosals/editCarosal", {
          title: "Add carosal",
          notification: req.flash("notification")[0],
          validationError: req.flash("validationError")[0],
          bodyData: req.flash("bodyData")[0],
          adminData: req.cookies.Admin,
          carosal: result,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add carosal page

// start add carosal post
async function editCarosalPost(req, res, next) {
  try {
    let body = req.body;
    console.log(body);
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Carosals");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/editCarosal/" + req.params.id
      );
      return;
    }

    const files = Rename_uploade_img(req);
    if (files) {
      removeImg(req, "Carosals", req.body.oldImage);
      body.image = files;
    } else {
      body.image = req.body.oldImage;
    }
    body.active = body.active ? true : false;
    tbl_carosals
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        returnWithMessage(
          req,
          res,
          "/dashboard/editCarosal/" + req.params.id,
          "Edit Successful",
          "success"
        );
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add carosal post

// start carosal activate
async function activeCarosal(req, res, next) {
  try {
    let carosalStatus = req.body.carosalStatus;
    tbl_carosals.update(
      {
        active: carosalStatus == "true" ? false : true,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    returnWithMessage(
      req,
      res,
      "/dashboard/allcarosals",
      carosalStatus == "true"
        ? "your carosal is not active"
        : "your carosal is active",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end carosal activate

// start delete carosal
async function deleteCarosal(req, res, next) {
  try {
    removeImg(req, "carosals", req.body.image);
    tbl_carosals.destroy({
      where: {
        id: req.body.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashboard/allcarosals",
      "delete success",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end delete admin

module.exports = {
  showAllcarosals,
  addCarosal,
  addCarosalPost,
  editCarosal,
  editCarosalPost,
  activeCarosal,
  deleteCarosal,
};
