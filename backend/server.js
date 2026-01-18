require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const DBconnect = require("./database/DBconnect");
const buyerRoutes = require("./routes/buyer");
const authRoute = require("./routes/auth");
const propertyRoute = require("./routes/property");

const app = express();

/* =====================
   Database Connection
===================== */
DBconnect();

/* =====================
   Middlewares
===================== */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =====================
   Test Route
===================== */
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* =====================
   Routes
   (IMPORTANT: NO PREFIX)
===================== */
app.use(authRoute);        // /signup, /login, /check-auth
app.use(buyerRoutes);
app.use("/property", propertyRoute);
/* =====================
   Static Files
===================== */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

/* =====================
   Server Start
===================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

