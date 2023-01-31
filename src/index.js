const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../.env") });
const { logging } = require("./config/logging.config");
const { AllDashboard } = require("./routes/dashboard/allDashboardRoute");
const cookies = require("cookie-parser");
const session = require("express-session");
const connectFlash = require("connect-flash");
const SqlSession = require("express-mysql-session");
const { LanguageRouter } = require("./routes/dashboard/language.router");
const { asideLocalization } = require("./translation/dashboard/aside");
const { navLocalization } = require("./translation/dashboard/nav");
const myApp = express();
const PORT = process.env.NODE_SERVER_PORT;

//  start session ////////////////////////////////////
const options = {
  host: process.env.host,
  user: process.env.username_DB,
  password: process.env.password,
  database: process.env.database,
};
var MySQLStore = SqlSession(session);
const sessionStore = new MySQLStore(options);
myApp.use(cookies());
myApp.use(
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
myApp.use(connectFlash());
// end session ////////////////////////////////////

// start templateEngine ////////////////////////////////////
myApp.set("views", path.join(__dirname, "./view"));
myApp.set("view engine", "ejs");
myApp.use("/assets", express.static(path.join(__dirname, "./assets")));
myApp.use("/public", express.static(path.join(__dirname, "./public")));
myApp.use(express.json()); // parse json request body
myApp.use(express.urlencoded({ extended: true })); // parse urlencoded request body
// end templateEngine ////////////////////////////////////

// start routes ////////////////////////////////////
myApp.use((req, res, next) => {
  const lang = req.cookies.lang ? req.cookies.lang : "eng";
  asideLocalization.setLocale(lang);
  navLocalization.setLocale(lang);
  res.locals.asideLocalization = asideLocalization.translate;
  res.locals.navLocalization = navLocalization.translate;
  res.locals.lang = lang;

  next();
});
AllDashboard(myApp);
myApp.use("/", LanguageRouter);
// end route ////////////////////////////////////

myApp.listen(PORT || 3000, () => {
  logging().info(`this sit work on ${PORT}`);
});
