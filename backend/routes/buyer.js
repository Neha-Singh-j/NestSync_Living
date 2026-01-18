const express = require('express');
const { signupBuyer, loginBuyer } = require('../controller/buyer');

const router = express.Router();

router.post('/signup',signupBuyer);
router.post('/login',loginBuyer);
router.post("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" }); // Remove token cookie
    return res.json({ message: "Logged out successfully" });
});

module.exports = router;