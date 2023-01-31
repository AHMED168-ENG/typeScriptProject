const { Router } = require("express");
const {
  getDashboard,
} = require("../../controllers/dashboard/dashboar.controller");
const { isAuthonticate } = require("../../middelware/isAuthonticate");
const DashboardRoutes = Router();
DashboardRoutes.get("/", isAuthonticate, getDashboard);

module.exports = {
  DashboardRoutes,
};
