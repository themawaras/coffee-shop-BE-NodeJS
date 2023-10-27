const { maxHeaderSize } = require("http");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const fileExt = path.extname(file.originalname);

    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    const customFileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, customFileName);
  },
});

const diskUpload = multer({
  storage,
  limits: {
    fileSize: 2e6,
  },
  fileFilter: (req, res, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, true);
    }
  },
});

module.exports = {
  singleUpload: (fieldname) => diskUpload.single(fieldname),
  //   multiUpload: (fieldname, maxCount = 1) => diskUpload.array(fieldname, maxCount),
  //   multiFieldUpload: (fieldlist) => diskUpload.fields(fieldlist),
};
