import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../.env") });
import { LoggingConfig } from "./config/logging.config";
import { AllDashboard } from "./routes/dashboard/allDashboardRoute";
import session from "express-session";
import connectFlash from "connect-flash";
import SqlSession from "express-mysql-session";
export class App {
  public myApp: express.Application = express();
  public port: string | undefined;
  public logging: LoggingConfig = new LoggingConfig();
  constructor() {
    this.packageSeting();
    this.port = process.env.NODE_SERVER_PORT || "3000";
    this.templateEngine();
    this.sessionSetting();
    this.routes();
    this.listen();
  }
  packageSeting(): void {}

  sessionSetting() {
    const options: {} = {
      host: process.env.host,
      user: process.env.username_DB,
      password: process.env.password,
      database: process.env.database,
    };
    var MySQLStore = SqlSession(session);
    const sessionStore = new MySQLStore(options);
    this.myApp.use(
      session({
        store: sessionStore,
        secret: process.env.secret || "",
        saveUninitialized: false, // معناها انه عند عمل session لاتقوم بحفظها في الداتابيز الا عندما امرك بذالك
        cookie: {
          // السشن ده هو في الاصل عباره عن cookie لذالك انا اقوم بتحديد بعض القيم لتحديد مده الانتهاء الديفولت هو عند اغلاق المتصفح
          maxAge: 60 * 60 * 60 * 100,
        },
        resave: false,
      })
    );
    this.myApp.use(connectFlash());
  }

  templateEngine(): void {
    this.myApp.set("views", path.join(__dirname, "./view"));
    this.myApp.set("view engine", "ejs");
    this.myApp.use("/assets", express.static(path.join(__dirname, "./assets")));
    this.myApp.use("/public", express.static(path.join(__dirname, "./public")));
    this.myApp.use(express.json()); // parse json request body
    this.myApp.use(express.urlencoded({ extended: true })); // parse urlencoded request body
  }

  routes(): void {
    AllDashboard(this.myApp);

    // this.myApp.use(
    //   "",
    //   (error: Error, req: Request, res: Response, next: NextFunction) => {
    //     console.log(error);
    //     res.status(500).render("Error", {
    //       title: "error",
    //       error: error.message,
    //     });
    //   }
    // );
  }

  listen(): void {
    this.myApp.listen(this.port, () => {
      this.logging.logging().info(`this sit work on ${this.port}`);
    });
  }
}
