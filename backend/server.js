require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const mlRoutes = require("./routes/ml.routes.js");
const DBconnect = require("./database/DBconnect");
const buyerRoutes = require("./routes/buyer");
const authRoute = require("./routes/auth");
const propertyRoute = require("./routes/property");

const app = express();

DBconnect();

   // MIDDLEWARES (ORDER MATTERS!)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/ml", mlRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully ");
});

app.use(authRoute);
app.use("/", buyerRoutes);
app.use("/property", propertyRoute);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
