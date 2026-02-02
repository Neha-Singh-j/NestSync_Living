import { useState } from "react";
import axios from "axios";

const PricePrediction = () => {
  const [form, setForm] = useState({
    lot_area: "",
    bedrooms: "",
    bathrooms: "",
    neighborhood: "",
    bldg_type: "",
  });

  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predictPrice = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://nestsync-living.onrender.com/api/ml/predict-price",
        {
          lot_area: Number(form.lot_area),
          bedrooms: Number(form.bedrooms),
          bathrooms: Number(form.bathrooms),
          neighborhood: form.neighborhood,
          bldg_type: form.bldg_type,
        }
      );
      setPrice(res.data.predicted_price);
    } catch (err) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>House Price Prediction</h2>

      <input name="lot_area" placeholder="Area (sqft)" onChange={handleChange} />
      <input name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
      <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />
      <input name="neighborhood" placeholder="Neighborhood" onChange={handleChange} />

      <select name="bldg_type" onChange={handleChange}>
        <option value="">Select Property Type</option>
        <option value="1Fam">House</option>
        <option value="Twnhs">Townhouse</option>
        <option value="Duplex">Duplex</option>
      </select>

      <button onClick={predictPrice} disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>

      {price && <h3>Estimated Price: ₹{price}</h3>}
    </div>
  );
};

export default PricePrediction;
