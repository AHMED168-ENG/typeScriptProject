const express = require("express");
const {
  languageControlle,
} = require("../../controllers/dashboard/dashboar.controller");
const { isAuthonticate } = require("../../middelware/isAuthonticate");

const LanguageRouter = express.Router();
LanguageRouter.get("/setLanguage/:lang", isAuthonticate, languageControlle);

module.exports = {
  LanguageRouter,
};
