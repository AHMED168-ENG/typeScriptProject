const { validationResult } = require("express-validator");
const {
  catchError,
  returnWithMessage,
  handel_validation_errors,
  removeImg,
  Rename_uploade_img,
} = require("../../helpers/helper");
const { tbl_course } = require("../../models/courses.model");

// start show all Courses page
async function showAllCourses(req, res, next) {
  try {
    tbl_course.findAll().then((result) => {
      res.render("dashboard/courses/allCourses", {
        title: "All Courses",
        notification: req.flash("notification")[0],
        courses: result,
        adminData: req.cookies.Admin,
      });
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end show all Courses page

// start add Courses page
async function addCourse(req, res, next) {
  try {
    res.render("dashboard/courses/addCourse", {
      title: "Add course",
      notification: req.flash("notification")[0] || {},
      validationError: req.flash("validationError")[0] || {},
      bodyData: req.flash("bodyData")[0] || {},
      adminData: req.cookies.Admin,
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add Courses page

// start add course post
async function addCoursePost(req, res, next) {
  try {
    console.log(req.body);
    const Errors = validationResult(req);
    console.log(Errors);
    if (!Errors.isEmpty()) {
      removeImg(req, "Courses");
      handel_validation_errors(req, res, Errors.errors, "/dashboard/addCourse");
      return;
    }

    const files = Rename_uploade_img(req);
    let body = req.body;
    body.active = body.active ? true : false;
    body.image = files;
    tbl_course.create(body).then(() => {
      returnWithMessage(
        req,
        res,
        "/dashboard/addCourse",
        "add successful",
        "success"
      );
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add course post

// start add Courses page
async function editCourse(req, res, next) {
  try {
    tbl_course
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.render("dashboard/courses/editCourse", {
          title: "Add Course",
          notification: req.flash("notification")[0] || {},
          validationError: req.flash("validationError")[0] || {},
          bodyData: req.flash("bodyData")[0],
          adminData: req.cookies.Admin,
          course: result,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add Courses page

// start add course post
async function editCoursePost(req, res, next) {
  try {
    let body = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Courses");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/editCourse/" + req.params.id
      );
      return;
    }

    const files = Rename_uploade_img(req);
    if (files) {
      removeImg(req, "Courses", req.body.oldImage);
      body.image = files;
    } else {
      body.image = req.body.oldImage;
    }
    body.active = body.active ? true : false;

    tbl_course
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        returnWithMessage(
          req,
          res,
          "/dashboard/editCourse/" + req.params.id,
          "Edit Successful",
          "success"
        );
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add course post

// start course activate
async function activeCourse(req, res, next) {
  try {
    let courseStatus = req.body.courseStatus;
    tbl_course.update(
      {
        active: courseStatus == "true" ? false : true,
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
      "/dashboard/allCourses",
      courseStatus == "true"
        ? "your course is not active"
        : "your course is active",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end course activate

// start delete course
async function deleteCourse(req, res, next) {
  try {
    removeImg(req, "Courses", req.body.image);
    tbl_course.destroy({
      where: {
        id: req.body.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashboard/allCourses",
      "delete success",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end delete course

module.exports = {
  showAllCourses,
  addCourse,
  addCoursePost,
  editCourse,
  editCoursePost,
  activeCourse,
  deleteCourse,
};
