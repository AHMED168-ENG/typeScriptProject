import express from "express";
import { Dashboard } from "./dashboard.routes";
import { AdminRouter } from "./admins.routes";

export function AllDashboard(app: express.Application) {
  app.use("/dashboard", new Dashboard().router);
  app.use("/dashboard", new AdminRouter().router);
}
