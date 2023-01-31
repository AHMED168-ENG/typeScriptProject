const Localize = require("localize");
let navLocalization = new Localize({
  hi: {
    ar: "مرحيا",
    eng: "hello",
  },
  dashboard: {
    ar: "الداش بورد",
    eng: "dashboard",
  },
  editMyData: {
    ar: "تعديل الملف الشخصي",
    eng: "edit personal enformation",
  },
  logOut: {
    ar: "تسجيل خروج",
    eng: "log out",
  },
});

module.exports = {
  navLocalization,
};
