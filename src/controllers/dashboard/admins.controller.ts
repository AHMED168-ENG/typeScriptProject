import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorHandeling } from "../../helpers/helper";
import tbl_admins from "../../models/admin.model";
const errorHandelin = new ErrorHandeling();

export class AdminController {
  constructor() {}

  // start show all admins page
  async showAllAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      tbl_admins.findAll().then((result) => {
        res.render("dashboard/admins/allAdmins", {
          title: "All Admins",
          notification: req.flash("notification")[0],
          admins: result,
          adminData: {},
        });
      });
    } catch (error) {
      errorHandelin.catchError(next, error);
    }
  }
  // end show all admins page

  // start add admins page
  async addAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const Errors = validationResult(req);
      console.log(Errors.array());
      if (!Errors.isEmpty()) {
        req.flash("validationError", Errors.array({ onlyFirstError: false }));
      }
      res.render("dashboard/admins/addAdmin", {
        title: "Add Admin",
        notification: req.flash("notification")[0],
        validationError: req.flash("errorValidation")[0],
        adminData: {},
      });
    } catch (error) {
      errorHandelin.catchError(next, error);
    }
  }
  // end add admins page
}
