const jwt = require("jsonwebtoken");
const buyerModel = require("../database/models/buyer");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');

dotenv.config(); // Load environment variables

async function signupBuyer(req, res) {
    try {

        const {fullName, email, password} = req.body;
        // Check if the email already exists
        const existingUser = await buyerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // If email does not exist, create new user
        const newUser = await buyerModel.create({fullName, email, password : hashedPassword});
        console.log("User created successfully");

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


dotenv.config(); // Load env variables

async function loginBuyer(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await buyerModel.findOne({ email : email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            // { buyerId: user._id, email: user.email },
            // { userId: user._id },
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful" });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { signupBuyer, loginBuyer};
