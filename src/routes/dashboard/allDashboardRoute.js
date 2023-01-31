const express = require("express");
const { DashboardRoutes } = require("./dashboard.routes");
const { AdminRouter } = require("./admins.routes");
const { authDashboardRouter } = require("./auth/signIn.routes");
const { CoursesRouter } = require("./courses.routes");
const { isAuthonticate } = require("../../middelware/isAuthonticate");
const { CarosalRouter } = require("./carosals.routes");
const { OffersRouter } = require("./offers.routes");
const { FactRouter } = require("./fact.routes");
const { LanguageRouter } = require("./language.router");
const { InstructorRouter } = require("./instructor.routes");
function AllDashboard(app) {
  app.use("/dashboard", authDashboardRouter);
  app.use("/dashboard", DashboardRoutes);
  app.use("/dashboard", AdminRouter);
  app.use("/dashboard", CoursesRouter);
  app.use("/dashboard", CarosalRouter);
  app.use("/dashboard", OffersRouter);
  app.use("/dashboard", FactRouter);
  app.use("/dashboard", InstructorRouter);
}

module.exports = {
  AllDashboard,
};
