const express = require("express");
const upload = require("../middlewares/upload.middleware");
const { uploadTest } = require("../controllers/test.controller");

const router = express.Router();

router.post("/upload", upload.single("image"), uploadTest);

module.exports = router;
