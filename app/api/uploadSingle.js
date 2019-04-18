const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

const router = express.Router();

aws.config.update({
  secretAccessKey: "X+6Nt+QUSDTXnjMytu6qSKVO0yOk8mYxZlKnNgkd",
  accessKeyId: "AKIAWII6DD5WKU5YDX5U",
  region: "us-west-2" // region of your bucket
});
const s3 = new aws.S3();

const singleUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "99fotobucket1",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + ".jpg");
    }
  })
}).single("image");

router.post("/api/img-upload-single", (req, res) => {
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image Upload Error", detail: err.message }]
      });
    }
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
