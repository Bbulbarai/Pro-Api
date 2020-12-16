import express from "express";
const multer = require("multer");
import HTTPStatus from 'http-status';
import messages from '../../utils/messages';
import Banner from './banner.model';
const router = express.Router();
var app = express();
const current = new Date().toISOString().replace(/:/g, "-");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, current + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

router.post("/addBanner", upload.array("files", 12), async function (req, res, next) {
  const response = {
    success: messages.FAILED,
    data: null,
    message: null
  }
  const img = req.files[0].filename;
  const { name, status } = req.body;
  const createdBanner = new Banner({ img, name, status });
  await createdBanner.save({ runValidators: true, new: true }, (err, doc) => {
    if (err) {
      response.success = messages.ERROR;
      response.message = "Амжилттай";
      return "";
      // return sendResponse(err.message, HTTPStatus.OK, response, res, req);
    }
    response.data = doc;
    response.message = "Амжилттай";
    response.success = messages.SUCCESS;
    return "";
    // return sendResponse(null, HTTPStatus.OK, response, res, req);
  });
});


module.exports = router;