import path from "path";
import multer from "multer";

let urlUpload;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    urlUpload =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, urlUpload);
  },
});

const gpxFilter = function (req, file, cb) {
  if (!file.originalname.match(/.gpx$/)) {
    req.fileValidationError = "solo archivos gpx";
    return cb(new Error("solo archivos gpx"), false);
  }
  cb(null, true);
};
const uploadMulter = multer({
  storage: storage,
  fileFilter: gpxFilter,
  limits: { fileSize: 1500000 },
}).single("file");

export { uploadMulter, urlUpload };
