const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/predict-price", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict-price",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error("ML API Error:", error.message);
    res.status(500).json({ error: "Price prediction failed" });
  }
});
router.options("/predict-price", (req, res) => {
  res.sendStatus(200);
});

router.post("/detect-fraud", async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/detect-fraud",
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Fraud check failed" });
  }
});

module.exports = router;
