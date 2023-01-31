const express = require("express");
const path = require("path");
const {
  showAllInstructors,
  addInstructor,
  addInstructorPost,
  editInstructor,
  editInstructorPost,
  activeInstructor,
  deleteInstructor,
} = require("../../controllers/dashboard/instructors.controller");
const { uploade_img } = require("../../helpers/helper");
const { isAuthonticate } = require("../../middelware/isAuthonticate");

const {
  editInstructorValidation,
} = require("../../validation/dashboard/instructor/edit.validation");
const {
  addInstructorValidation,
} = require("../../validation/dashboard/instructor/add.validation");
const InstructorRouter = express.Router();
InstructorRouter.get("/allInstructors", isAuthonticate, showAllInstructors);
InstructorRouter.get("/addInstructor", isAuthonticate, addInstructor);
InstructorRouter.get("/editInstructor/:id", isAuthonticate, editInstructor);
InstructorRouter.post(
  "/addInstructor",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Instructors"), "image"),
  addInstructorValidation(),
  addInstructorPost
);
InstructorRouter.post(
  "/editInstructor/:id",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Instructors"), "image"),
  editInstructorValidation(),
  editInstructorPost
);
InstructorRouter.post("/activeInstructor", isAuthonticate, activeInstructor);
InstructorRouter.post("/deleteInstructor", isAuthonticate, deleteInstructor);
module.exports = {
  InstructorRouter,
};
