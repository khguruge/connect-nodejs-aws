var express = require("express");
var router = express.Router();
const fileController = require("./aws.controller");

router.post("/api/aws/file/upload",fileController.uploadAWS);
router.get("/api/aws/file/download/:filename",fileController.downloadAWS);

module.exports = router;
