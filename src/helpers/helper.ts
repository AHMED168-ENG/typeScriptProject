import { NextFunction, Request, Response } from "express";
import { LoggingConfig } from "../config/logging.config";

export class ErrorHandeling {
  constructor() {}

  async catchError(next: NextFunction, error: Error): Promise<void> {
    const logger = new LoggingConfig().logging().error(error.message);
    next(error);
  }

  async returnWithMessage(
    req: Request,
    res: Response,
    url: string = "",
    message: string = "",
    type: string = ""
  ): Promise<void> {
    message = message ? message : "هناك خطا ما ويرجي التحقق من الكود";
    type = type ? type : "danger";
    req.flash(message, type);
    res.redirect(url);
  }

  //   async handel_validation_errors(
  //     req: Request,
  //     res: Response,
  //     errors: []
  //   ): Promise<object> {
  //     var param = [];
  //     var newError = {};
  //     errors.forEach((element) => {
  //       if (!param.includes(element.param)) {
  //         param.push(element.param);
  //         newError[element.param] = [element];
  //       } else {
  //         newError[element.param].push(element);
  //       }
  //     });
  //     return newError;
  //   }
}

export class FileConfigration {}
