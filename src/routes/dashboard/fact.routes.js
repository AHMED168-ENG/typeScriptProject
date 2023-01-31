const express = require("express");
const path = require("path");
const {
  showAllfacts,
  addFact,
  addFactPost,
  editFact,
  editFactPost,
  activeFact,
  deleteFact,
} = require("../../controllers/dashboard/facts.controller");
const { uploade_img } = require("../../helpers/helper");
const { isAuthonticate } = require("../../middelware/isAuthonticate");
const {
  addFactValidation,
} = require("../../validation/dashboard/facts/add.validation");
const {
  editFactValidation,
} = require("../../validation/dashboard/facts/edit.validation");

const FactRouter = express.Router();
FactRouter.get("/allFacts", isAuthonticate, showAllfacts);
FactRouter.get("/addFact", isAuthonticate, addFact);
FactRouter.get("/editFact/:id", isAuthonticate, editFact);
FactRouter.post(
  "/addfact",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Facts"), "image"),
  addFactValidation(),
  addFactPost
);
FactRouter.post(
  "/editFact/:id",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Fact"), "image"),
  editFactValidation(),
  editFactPost
);
FactRouter.post("/activeFact", isAuthonticate, activeFact);
FactRouter.post("/deleteFact", isAuthonticate, deleteFact);
module.exports = {
  FactRouter,
};
