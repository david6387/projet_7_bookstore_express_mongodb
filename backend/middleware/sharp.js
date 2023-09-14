const sharp = require("sharp");
const path = require("path");

const imageResize = (req, res, next) => {
  if (!req.file) {
    next();
  } else {
    sharp(req.file.path)
      .resize(200, 260, { fit: "contain" })
      .webp({ quality: 90 })
      .toFile(
        req.file.path.replace(/\.jpeg|\.jpg|\.png/g, "_") + "thumbnail.webp"
      );
    next();
  }
};

module.exports = imageResize;
