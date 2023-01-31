const express = require("express");
const path = require("path");
const {
  loginDashboardPage,
  loginDashboardPost,
  logoutDashboardPost,
} = require("../../../controllers/dashboard/auth.controller");
const { isAuthonticate } = require("../../../middelware/isAuthonticate");
const { isNotAuthonticate } = require("../../../middelware/isNotAuthonticate");
const {
  signInDashboard,
} = require("../../../validation/dashboard/auth/signIn.validation");

const authDashboardRouter = express.Router();
authDashboardRouter.get("/loginPage", isNotAuthonticate, loginDashboardPage);
authDashboardRouter.post(
  "/loginPage",
  isNotAuthonticate,
  signInDashboard(),
  loginDashboardPost
);
authDashboardRouter.post("/logout", isAuthonticate, logoutDashboardPost);

module.exports = {
  authDashboardRouter,
};
