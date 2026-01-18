const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const {
  addProperty,
  upload,
  getAllProperties,
  getProperty,
} = require("../controller/property");

// 🔐 SELL PROPERTY (ONLY LOGGED-IN USER)
router.post(
  "/sell",
  authMiddleware,
  upload.array("images", 5),
  addProperty
);

// PUBLIC ROUTES
router.get("/all", getAllProperties);
router.get("/:id", getProperty);

module.exports = router;
