const express = require("express");
const path = require("path");
const {
  showAllCourses,
  addCourse,
  addCoursePost,
  editCourse,
  editCoursePost,
  activeCourse,
  deleteCourse,
} = require("../../controllers/dashboard/courses.controller");
const { uploade_img } = require("../../helpers/helper");
const { isAuthonticate } = require("../../middelware/isAuthonticate");

const {
  editCoursesValidation,
} = require("../../validation/dashboard/Courses/edit.validation");
const {
  addCourseValidation,
} = require("../../validation/dashboard/courses/add.validation");
const CoursesRouter = express.Router();
CoursesRouter.get("/allCourses", isAuthonticate, showAllCourses);
CoursesRouter.get("/addCourse", isAuthonticate, addCourse);
CoursesRouter.get("/editCourse/:id", isAuthonticate, editCourse);
CoursesRouter.post(
  "/addCourse",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Courses"), "image"),
  addCourseValidation(),
  addCoursePost
);
CoursesRouter.post(
  "/editCourse/:id",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Courses"), "image"),
  editCoursesValidation(),
  editCoursePost
);
CoursesRouter.post("/activeCourse", isAuthonticate, activeCourse);
CoursesRouter.post("/deleteCourse", isAuthonticate, deleteCourse);
module.exports = {
  CoursesRouter,
};
