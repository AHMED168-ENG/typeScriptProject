const { logging } = require("../config/logging.config");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
function catchError(next, error) {
  logging().error(error.message);
  next(error);
}

function returnWithMessage(req, res, url = "", message = "", type = "") {
  message = message ? message : "هناك خطا ما ويرجي التحقق من الكود";
  type = type ? type : "danger";
  req.flash("notification", { message, type });
  res.redirect(url);
}

function handel_validation_errors(req, res, errors, path) {
  var param = [];
  var newError = {};

  errors.forEach((element) => {
    if (!param.includes(element.param)) {
      param.push(element.param);
      newError[element.param] = [element];
    } else {
      newError[element.param].push(element);
    }
  });
  req.flash("validationError", newError);
  req.flash("bodyData", req.body);
  res.redirect(path);
}
function handel_validationImage_errors(req) {
  if (req.files.length == 0) {
    req.imageError.push("ادخل الصوره");
  }
  req.flash("imageValidation", req.imageError);
}

/*------------------------------------ start uploade image -------------------------------*/
const uploade_img = (path, image) => {
  return multer({ dest: path }).array(image);
};
const uploade_img_multi_fild = (array, dest) => {
  return multer({ dest: dest }).fields(array);
};
/*--------------------------------------------------*/

const Rename_uploade_img_multiFild = (fields) => {
  var fileds_img = {};
  var image = "";
  fields.forEach((element) => {
    if (element) {
      element.forEach((element, i) => {
        var randomNumber = Math.random(1000, 9000);
        var newPath =
          element.destination + "/" + randomNumber + element.originalname;
        fs.renameSync(element.path, newPath);
        image += randomNumber + element.originalname + "--";
      });
      fileds_img[element[0].fieldname] = image;
      image = "";
    }
  });
  return fileds_img;
};
/*--------------------------------------------------*/

/*--------------------------------------------------*/

const Rename_uploade_img = (req) => {
  var image = "";
  req.files.forEach((element) => {
    var randomNumber = Math.random(1000, 9000);
    var newPath =
      element.destination + "/" + randomNumber + element.originalname;
    fs.renameSync(element.path, newPath);
    image += randomNumber + element.originalname + "--";
  });
  return image;
};
/*--------------------------------------------------*/

const removeImgFiled = (fields) => {
  fields.forEach((element) => {
    if (element) {
      element.forEach((element, i) => {
        fs.unlinkSync(element.path);
      });
    }
  });
};
/*--------------------------------------------------*/

/*--------------------------------------------------*/

const removeImg = (req, folder, imgname = "") => {
  if (!imgname) {
    req.files.forEach((element) => {
      fs.unlinkSync(element.path);
    });
  } else {
    var imgname = imgname.split("--");
    for (var i = 0; i < imgname.length - 1; i++) {
      fs.unlink(
        path.join("src/assets/dashboard/images/" + folder + "/" + imgname[i]),
        () => {}
      );
    }
  }
};
/*------------------------------------ end uploade image -------------------------------*/

module.exports = {
  handel_validation_errors,
  returnWithMessage,
  catchError,
  handel_validationImage_errors,
  uploade_img,
  removeImg,
  Rename_uploade_img,
  Rename_uploade_img_multiFild,
  uploade_img_multi_fild,
  removeImgFiled,
};
