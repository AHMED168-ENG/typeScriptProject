import { Router } from "express";
import { AdminController } from "../../controllers/dashboard/admins.controller";
import { addAdminValidation } from "../../validation/admin/add.validation";
const adminValidation = new addAdminValidation();
export class AdminRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/allAdmins", new AdminController().showAllAdmins);
    this.router.get(
      "/addAdmin",
      adminValidation.validation(),
      new AdminController().addAdmin
    );
  }
}
