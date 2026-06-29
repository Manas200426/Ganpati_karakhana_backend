const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  uploadMurtiPhotos,
  deleteMurtiPhoto,
  getMurtiPhotos,
} = require("../controllers/photo.controller");

router.post(
  "/:murtiItemId",
  authMiddleware,
  upload.array("photos", 5),
  uploadMurtiPhotos,
);
router.delete("/:photoId", authMiddleware, deleteMurtiPhoto);
router.get(
    "/:murtiItemId",
    authMiddleware,
    getMurtiPhotos
);
module.exports = router;
