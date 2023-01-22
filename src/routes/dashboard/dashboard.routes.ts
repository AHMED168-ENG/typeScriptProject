import express from "express";
import { DashboardController } from "../../controllers/dashboard/dashboar.controller";
export class Dashboard {
  public router: express.Router;
  public dashboardController = new DashboardController();
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes(): void {
    this.router.get("/", this.dashboardController.getDashboard);
  }
}
