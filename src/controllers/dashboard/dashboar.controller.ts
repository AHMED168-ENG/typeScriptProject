import { NextFunction, Request, Response } from "express";
import { ErrorHandeling } from "../../helpers/helper";
const errorHandeling = new ErrorHandeling();
export class DashboardController {
  constructor() {}
  getDashboard(req: Request, res: Response, next: NextFunction): void {
    try {
      console.log(req.flash);
      console.log(req.session);
      res.render("dashboard/dashboard", {
        title: "dashboard",
        notification: req.flash("notification")[0],
        errorsValidation: req.flash("errorsValidation")[0],
        adminData: {},
      });
    } catch (error) {
      errorHandeling.catchError(next, error);
    }
  }
}
