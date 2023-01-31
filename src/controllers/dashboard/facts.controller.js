const { validationResult } = require("express-validator");
const {
  catchError,
  returnWithMessage,
  handel_validation_errors,
  removeImg,
  Rename_uploade_img,
} = require("../../helpers/helper");
const { tbl_facts } = require("../../models/facts.model");

// start show all facts page
async function showAllfacts(req, res, next) {
  try {
    tbl_facts.findAll().then((result) => {
      res.render("dashboard/facts/allfacts", {
        title: "All facts",
        notification: req.flash("notification")[0],
        facts: result,
        adminData: req.cookies.Admin,
      });
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end show all facts page

// start add Fact page
async function addFact(req, res, next) {
  try {
    if (process.env.fourFactsOnly == "true") {
      const FactCount = await tbl_facts.findAndCountAll({
        where: {
          active: true,
        },
      });
      if (FactCount.count == +process.env.factsNumberActive) {
        return returnWithMessage(
          req,
          res,
          "/dashboard/allfacts",
          "You cant add more than 4 active facts"
        );
      }
    }
    res.render("dashboard/facts/addFact", {
      title: "Add Fact",
      notification: req.flash("notification")[0],
      validationError: req.flash("validationError")[0],
      bodyData: req.flash("bodyData")[0] || {},
      adminData: req.cookies.Admin,
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add Fact page

// start add Fact post
async function addFactPost(req, res, next) {
  try {
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      handel_validation_errors(req, res, Errors.errors, "/dashboard/addFact");
      return;
    }

    let body = req.body;
    body.active = body.active ? true : false;
    tbl_facts.create(body).then((result) => {
      returnWithMessage(
        req,
        res,
        "/dashboard/addFact",
        "add successful",
        "success"
      );
    });
  } catch (error) {
    catchError(next, error);
  }
}
// end add Fact post

// start add Fact page
async function editFact(req, res, next) {
  try {
    tbl_facts
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.render("dashboard/facts/editFact", {
          title: "edit Fact",
          notification: req.flash("notification")[0],
          validationError: req.flash("validationError")[0],
          bodyData: req.flash("bodyData")[0],
          adminData: req.cookies.Admin,
          fact: result,
        });
      })
      .catch((error) => next(error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add Fact page

// start add Fact post
async function editFactPost(req, res, next) {
  try {
    let body = req.body;
    const Errors = validationResult(req);
    if (!Errors.isEmpty()) {
      handel_validation_errors(
        req,
        res,
        Errors.errors,
        "/dashboard/editFact/" + req.params.id
      );
      return;
    }

    body.active = body.active ? true : false;
    tbl_facts
      .update(body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        returnWithMessage(
          req,
          res,
          "/dashboard/editFact/" + req.params.id,
          "Edit Successful",
          "success"
        );
      })
      .catch((error) => catchError(next, error));
  } catch (error) {
    catchError(next, error);
  }
}
// end add Fact post

// start Fact activate

async function activeFact(req, res, next) {
  try {
    const factStatus = req.body.factStatus;
    if (process.env.fourFactsOnly == "true") {
      const activeOffers = await tbl_facts.scope("active").findAndCountAll();
      if (
        activeOffers.count == +process.env.factsNumberActive &&
        factStatus == "false"
      ) {
        return returnWithMessage(
          req,
          res,
          "/dashboard/allFacts",
          "You cant add more than 4 active facts"
        );
      }
    }
    tbl_facts.update(
      {
        active: factStatus == "true" ? false : true,
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
      "/dashboard/allFacts",
      factStatus == "true" ? "your fact is not active" : "your fact is active",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end Fact activate

// start delete Fact
async function deleteFact(req, res, next) {
  try {
    tbl_facts.destroy({
      where: {
        id: req.body.id,
      },
    });
    returnWithMessage(
      req,
      res,
      "/dashboard/allFacts",
      "delete success",
      "success"
    );
  } catch (error) {
    catchError(next, error);
  }
}
// end delete Fact

module.exports = {
  showAllfacts,
  addFact,
  addFactPost,
  editFact,
  editFactPost,
  activeFact,
  deleteFact,
};
