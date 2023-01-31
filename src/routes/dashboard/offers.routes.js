const express = require("express");
const path = require("path");
const {
  showAllOffers,
  addOffer,
  addOfferPost,
  editOffer,
  editOfferPost,
  activeOffer,
  deleteOffer,
} = require("../../controllers/dashboard/offers.controller");
const { uploade_img } = require("../../helpers/helper");
const { isAuthonticate } = require("../../middelware/isAuthonticate");
const {
  addOffersValidation,
} = require("../../validation/dashboard/offers/add.validation");
const {
  editOffersValidation,
} = require("../../validation/dashboard/offers/edit.validation");

const OffersRouter = express.Router();
OffersRouter.get("/allOffers", isAuthonticate, showAllOffers);
OffersRouter.get("/addOffer", isAuthonticate, addOffer);
OffersRouter.get("/editOffer/:id", isAuthonticate, editOffer);
OffersRouter.post(
  "/addOffer",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Offers"), "image"),
  addOffersValidation(),
  addOfferPost
);
OffersRouter.post(
  "/editOffer/:id",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Offers"), "image"),
  editOffersValidation(),
  editOfferPost
);
OffersRouter.post("/activeOffer", isAuthonticate, activeOffer);
OffersRouter.post("/deleteOffer", isAuthonticate, deleteOffer);
module.exports = {
  OffersRouter,
};
