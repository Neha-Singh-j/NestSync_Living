const mongoose = require('mongoose');

async function DBconnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Atlas connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
    }
}

module.exports = DBconnect;
