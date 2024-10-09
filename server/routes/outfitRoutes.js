const express = require("express");
const router = express.Router();
const outfitController = require("../controllers/outfitController");
const multer = require("multer");
const { requireAuth } = require("../middleware/authenticate");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post(
  "/uploadImg",
  upload.single("image"),
  requireAuth,
  outfitController.uploadImg
);

// router.get("/images/:key", requireAuth, outfitController.images);

module.exports = router;
