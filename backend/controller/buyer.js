const jwt = require("jsonwebtoken");
const buyerModel = require("../database/models/buyer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

// ================== SIGNUP ==================
async function signupBuyer(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await buyerModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await buyerModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ================== LOGIN ==================
async function loginBuyer(req, res) {
  try {
    const { email, password } = req.body;

    const user = await buyerModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        buyerId: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // FIXED COOKIE FOR PRODUCTION (Vercel + Render)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,        // must be true for HTTPS
      sameSite: "none",    // must be none for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { signupBuyer, loginBuyer };
