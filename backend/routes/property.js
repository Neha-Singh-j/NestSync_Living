const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const Property = require("../database/models/property"); //  MISSING IMPORT

const {
  addProperty,
  upload,
  getAllProperties,
  getProperty,
} = require("../controller/property");

//  SELL PROPERTY (ONLY LOGGED-IN USER)
router.post(
  "/sell",
  authMiddleware,
  upload.array("images", 5),
  addProperty
);

//  GET LOGGED-IN USER LISTINGS
router.get("/my-listings", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user.buyerId,
    });

    res.json(properties);
  } catch (err) {
    console.error("My listings error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//  PUBLIC ROUTES
router.get("/all", getAllProperties);
router.get("/:id", getProperty);

module.exports = router;
