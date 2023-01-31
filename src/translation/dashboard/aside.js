const Localize = require("localize");
let asideLocalization = new Localize({
  admin: {
    ar: "ادمن",
    eng: "admin",
  },
  allAdmins: {
    ar: "عرض كل الادمن",
    eng: "show all admins",
  },
  addAdmin: {
    ar: "اضافه ادمن",
    eng: "add admin",
  },
  main: {
    ar: "الرءيسي",
    eng: "main",
  },
  allCourses: {
    ar: "عرض كل الكورسات",
    eng: "show all courses",
  },
  addCourse: {
    ar: "اضافه كورس",
    eng: "add course",
  },
  course: {
    ar: "الكورسات",
    eng: "courses",
  },
  carosal: {
    ar: "الكاروسالات",
    eng: "carosal",
  },
  allCarosal: {
    ar: "عرض كل الكاروسالات",
    eng: "show all Carosal",
  },
  addCarosal: {
    ar: "اضافه كاروسال",
    eng: "add Carosal",
  },
  offers: {
    ar: "العروض",
    eng: "offers",
  },
  allOffers: {
    ar: "عرض كل العروض",
    eng: "show all Carosal",
  },
  addOffer: {
    ar: "اضافه عرض",
    eng: "add offer",
  },
  facts: {
    ar: "الحقاءق",
    eng: "facts",
  },
  allFacts: {
    ar: "عرض كل الحقاءق",
    eng: "show all facts",
  },
  addFact: {
    ar: "اضافه عرض",
    eng: "add Fact",
  },
});

module.exports = {
  asideLocalization,
};
