const { validationResult } = require("express-validator");
const {
  catchError,
  returnWithMessage,
  handel_validation_errors,
  removeImg,
  Rename_uploade_img,
} = require("../../helpers/helper");
const { tbl_instructor } = require("../../models/instructor");

// start show all instructors page
async function showAllInstructors(req, res, next) {
  try {
    tbl_instructor.findAll().then((result) => {
      res.render("dashboard/instructors/allInstructors", {
        title: "All instructors",
        notification: req.flash("notification")[0],
        instructors: result,
        adminData: req.cookies.Admin,
      });
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end show all instructors page

// start add instructors page
async function addInstructor(req, res, next) {
  try {
    res.render("dashboard/instructors/addInstructor", {
      title: "Add instructors",
      notification: req.flash("notification")[0] || {},
      validationError: req.flash("validationError")[0] || {},
      bodyData: req.flash("bodyData")[0] || {},
      adminData: req.cookies.Admin,
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add instructors page

// start add instructors post
async function addInstructorPost(req, res, next) {
  try {
    const Errors = validationResult(req);
    console.log(Errors);
    if (!Errors.isEmpty()) {
      removeImg(req, "Instructors");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/addInstructor"
      );
      return;
    }

    const files = Rename_uploade_img(req);
    let body = req.body;
    body.active = body.active ? true : false;
    body.image = files;
    tbl_instructor.create(body).then(() => {
      returnWithMessage(
        req,
        res,
        "/dashboard/addInstructor",
        "add successful",
        "success"
      );
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add instructors post

// start edit instructors page
async function editInstructor(req, res, next) {
  try {
    tbl_instructor
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.render("dashboard/instructors/editinstructor", {
          title: "edit instructor",
          notification: req.flash("notification")[0] || {},
          validationError: req.flash("validationError")[0] || {},
          bodyData: req.flash("bodyData")[0],
          adminData: req.cookies.Admin,
          instructor: result,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end edit instructors page

// start edit instructors post
async function editInstructorPost(req, res, next) {
  try {
    let body = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Instructors");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/editInstructor/" + req.params.id
      );
      return;
    }

    const files = Rename_uploade_img(req);
    if (files) {
      removeImg(req, "Instructors", req.body.oldImage);
      body.image = files;
    } else {
      body.image = req.body.oldImage;
    }
    body.active = body.active ? true : false;

    tbl_instructor
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        returnWithMessage(
          req,
          res,
          "/dashboard/editinstructor/" + req.params.id,
          "Edit Successful",
          "success"
        );
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end edit instructors post

// start instructors activate
async function activeInstructor(req, res, next) {
  try {
    let instructorStatus = req.body.instructorStatus;
    tbl_instructor.update(
      {
        active: instructorStatus == "true" ? false : true,
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
      "/dashboard/allInstructors",
      instructorstatus == "true"
        ? "your instructors is not active"
        : "your instructors is active",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end instructors activate

// start delete instructors
async function deleteInstructor(req, res, next) {
  try {
    removeImg(req, "Instructors", req.body.image);
    tbl_instructor.destroy({
      where: {
        id: req.body.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashboard/allInstructors",
      "delete success",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end delete instructors

module.exports = {
  showAllInstructors,
  addInstructor,
  addInstructorPost,
  editInstructor,
  editInstructorPost,
  activeInstructor,
  deleteInstructor,
};
