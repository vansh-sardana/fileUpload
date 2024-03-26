const express= require("express");
const router= express.Router();

const {fileUpload, imageUpload, vdoUpload, compressUpload}= require("../controllers/fileUpload");
router.post("/localUpload", fileUpload);
router.post("/imageUpload", imageUpload);
router.post("/vdoUpload", vdoUpload);
router.post("/compressUpload", compressUpload);


module.exports= router;