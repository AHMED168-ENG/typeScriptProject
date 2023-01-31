const express = require("express");
const path = require("path");
const {
  showAllcarosals,
  addCarosal,
  addCarosalPost,
  editCarosal,
  editCarosalPost,
  activeCarosal,
  deleteCarosal,
} = require("../../controllers/dashboard/carosals.controller");
const { uploade_img } = require("../../helpers/helper");
const { isAuthonticate } = require("../../middelware/isAuthonticate");
const {
  addCarosalValidation,
} = require("../../validation/dashboard/carosals/add.validation");
const {
  editCarosalValidation,
} = require("../../validation/dashboard/carosals/edit.validation");

const CarosalRouter = express.Router();
CarosalRouter.get("/allCarosals", isAuthonticate, showAllcarosals);
CarosalRouter.get("/addCarosal", isAuthonticate, addCarosal);
CarosalRouter.get("/editCarosal/:id", isAuthonticate, editCarosal);
CarosalRouter.post(
  "/addCarosal",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Carosals"), "image"),
  addCarosalValidation(),
  addCarosalPost
);
CarosalRouter.post(
  "/editCarosal/:id",
  isAuthonticate,
  uploade_img(path.join("src/assets/dashboard/images/Carosals"), "image"),
  editCarosalValidation(),
  editCarosalPost
);
CarosalRouter.post("/activeCarosal", isAuthonticate, activeCarosal);
CarosalRouter.post("/deleteCarosal", isAuthonticate, deleteCarosal);

module.exports = {
  CarosalRouter,
};
