const express = require('express');
const { signupBuyer, loginBuyer } = require('../controller/buyer');

const router = express.Router();

router.post('/signup',signupBuyer);
router.post('/login',loginBuyer);
// router.post("/logout", (req, res) => {
//     res.clearCookie("token", { path: "/" }); // Remove token cookie
//     return res.json({ message: "Logged out successfully" });
// });
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

const authMiddleware = require("../middleware/auth");
const Buyer = require("../database/models/buyer");

/* ADD / REMOVE WISHLIST */
router.post("/wishlist/:propertyId", authMiddleware, async (req, res) => {
  const { propertyId } = req.params;
  const user = await Buyer.findById(req.user.buyerId);

  if (!user) return res.status(404).json({ message: "User not found" });

  const alreadySaved = user.wishlist.includes(propertyId);

  if (alreadySaved) {
    user.wishlist.pull(propertyId);
  } else {
    user.wishlist.push(propertyId);
  }

  await user.save();
  res.json({ success: true, wishlist: user.wishlist });
});

/* GET USER WISHLIST */
router.get("/wishlist", authMiddleware, async (req, res) => {
  const user = await Buyer.findById(req.user.buyerId).populate("wishlist");
  res.json(user.wishlist);
});

// DELETE wishlist
// router.delete("/wishlist/:propertyId", authMiddleware, async (req, res) => {
//   await Wishlist.findOneAndDelete({
//     user: req.user.buyerId,
//     property: req.params.propertyId,
//   });
//   res.json({ success: true });
// });

module.exports = router;