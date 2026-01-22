const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      authenticated: true,
      user: {
        buyerId: decoded.buyerId,
        email: decoded.email,
        fullName: decoded.fullName, // 🔥 REQUIRED
      },
    });
  } catch (error) {
    return res.status(200).json({ authenticated: false });
  }
});

module.exports = router;
