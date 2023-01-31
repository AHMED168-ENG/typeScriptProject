const express = require("express");
const path = require("path");
const {
  addAdmin,
  showAllAdmins,
  addAdminPost,
  editAdmin,
  editAdminPost,
  activeAdmin,
  deleteAdmin,
} = require("../../controllers/dashboard/admins.controller");
const { fileStorage, imgFilter, uploade_img } = require("../../helpers/helper");
const { isAuthonticate } = require("../../middelware/isAuthonticate");
const {
  addAdminValidation,
} = require("../../validation/dashboard/admin/add.validation.js");
const {
  editAdminValidation,
} = require("../../validation/dashboard/admin/edit.validation");
const AdminRouter = express.Router();
AdminRouter.get("/allAdmins", isAuthonticate, showAllAdmins);
AdminRouter.get("/addAdmin", isAuthonticate, addAdmin);
AdminRouter.get("/editAdmin/:id", isAuthonticate, editAdmin);
AdminRouter.post(
  "/addAdmin",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Admins"), "image"),
  addAdminValidation(),
  addAdminPost
);
AdminRouter.post(
  "/editAdmin/:id",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Admins"), "image"),
  editAdminValidation(),
  editAdminPost
);
AdminRouter.post("/activeAdmin", isAuthonticate, activeAdmin);
AdminRouter.post("/deleteAdmin", isAuthonticate, deleteAdmin);

module.exports = {
  AdminRouter,
};
