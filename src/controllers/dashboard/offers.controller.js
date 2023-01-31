const { validationResult } = require("express-validator");
const {
  catchError,
  returnWithMessage,
  handel_validation_errors,
  removeImg,
  Rename_uploade_img,
} = require("../../helpers/helper");
const { tbl_offers } = require("../../models/offers.model");

// start show all offers page
async function showAllOffers(req, res, next) {
  try {
    tbl_offers.findAll().then((result) => {
      res.render("dashboard/offers/allOffers", {
        title: "All offers",
        notification: req.flash("notification")[0],
        offers: result,
        adminData: req.cookies.Admin,
      });
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end show all offers page

// start add offer page
async function addOffer(req, res, next) {
  try {
    if (process.env.offersFourOnly == "true") {
      const offerCount = await tbl_offers.findAndCountAll({
        where: {
          active: true,
        },
      });
      if (offerCount.count == +process.env.offerNumberActive) {
        return returnWithMessage(
          req,
          res,
          "/dashboard/allOffers",
          "You cant add more than 4 active offers"
        );
      }
    }
    res.render("dashboard/offers/addOffer", {
      title: "Add Offer",
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      bodyData: req.flash("bodyData")[0] || {},
      adminData: req.cookies.Admin,
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add Offer page

// start add Offer post
async function addOfferPost(req, res, next) {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Offers");
      handel_validation_errors(req, res, Errors.errors, "/dashboard/addOffer");
      return;
    }

    const files = Rename_uploade_img(req);
    let body = req.body;
    body.active = body.active ? true : false;
    body.image = files;
    tbl_offers.create(body).then((result) => {
      returnWithMessage(
        req,
        res,
        "/dashboard/addOffer",
        "add successful",
        "success"
      );
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add Offer post

// start add Offer page
async function editOffer(req, res, next) {
  try {
    tbl_offers
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.render("dashboard/offers/editOffer", {
          title: "edit Offer",
          notification: req.flash("notification")[0],
          validationError: req.flash("validationError")[0],
          bodyData: req.flash("bodyData")[0],
          adminData: req.cookies.Admin,
          offer: result,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add Offer page

// start add Offer post
async function editOfferPost(req, res, next) {
  try {
    let body = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      removeImg(req, "Offers");
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/editOffer/" + req.params.id
      );
      return;
    }

    const files = Rename_uploade_img(req);
    if (files) {
      removeImg(req, "Offers", req.body.oldImage);
      body.image = files;
    } else {
      body.image = req.body.oldImage;
    }
    body.active = body.active ? true : false;
    tbl_offers
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        returnWithMessage(
          req,
          res,
          "/dashboard/editOffer/" + req.params.id,
          "Edit Successful",
          "success"
        );
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add Offer post

// start Offer activate
async function activeOffer(req, res, next) {
  try {
    if (process.env.offersFourOnly == "true") {
      const activeOffers = await tbl_offers.scope("active").findAndCountAll();
      if (
        activeOffers.count == +process.env.offerNumberActive &&
        offerStatus == "false"
      ) {
        return returnWithMessage(
          req,
          res,
          "/dashboard/allOffers",
          "You cant add more than 4 active offers"
        );
      }
    }
    tbl_offers.update(
      {
        active: offerStatus == "true" ? false : true,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    returnWithMessage(
      req,
      res,
      "/dashboard/alloffers",
      offerStatus == "true"
        ? "your Offer is not active"
        : "your Offer is active",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end Offer activate

// start delete Offer
async function deleteOffer(req, res, next) {
  try {
    removeImg(req, "offers", req.body.image);
    tbl_offers.destroy({
      where: {
        id: req.body.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashboard/allOffers",
      "delete success",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end delete offer

module.exports = {
  showAllOffers,
  addOffer,
  addOfferPost,
  editOffer,
  editOfferPost,
  activeOffer,
  deleteOffer,
};
