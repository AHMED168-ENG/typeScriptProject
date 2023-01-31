const Localize = require("localize");
let adminLocalization = new Localize({
  admins: {
    ar: "كل الادمن",
    eng: "admin",
  },
  main: {
    ar: "الرءيسي",
    eng: "main",
  },
  allAdminSit: {
    ar: "كل الادمن في الموقع",
    eng: "add admin",
  },
  main: {
    ar: "الرءيسي",
    eng: "main",
  },
  name: {
    ar: "الاسم",
    eng: "name",
  },
  email: {
    ar: "الايميل",
    eng: "email",
  },
  mobile: {
    ar: "الموبيل",
    eng: "mobile",
  },
  image: {
    ar: "الصوره",
    eng: "image",
  },
  state: {
    ar: "الحاله",
    eng: "state",
  },
  action: {
    ar: "الاجراءات",
    eng: "action",
  },
  edit: {
    ar: "تعديل",
    eng: "edit",
  },
  active: {
    ar: "تفعيل",
    eng: "active",
  },
  Deactivation: {
    ar: "الغاء التفعيل",
    eng: "Deactivation",
  },
  delete: {
    ar: "حذف",
    eng: "delete",
  },
});

module.exports = {
  adminLocalization,
};
