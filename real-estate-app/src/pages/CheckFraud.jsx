import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CheckFraud = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFraud = async () => {
      try {
        // fetch property details first
        const propertyRes = await axios.get(
          `http://localhost:3000/property/${id}`
        );

        const p = propertyRes.data;

        const fraudRes = await axios.post(
          "http://localhost:3000/api/ml/detect-fraud",
          {
            price: p.price,
            area: p.area,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            amenities_count: p.amenities.length
          }
        );

        setResult(fraudRes.data);
      } catch (err) {
        alert("Fraud check failed");
      } finally {
        setLoading(false);
      }
    };

    checkFraud();
  }, [id]);

  if (loading) return <p>Checking fraud risk...</p>;

  return (
    <div>
      <h2>Fraud Detection Result</h2>

      {result.fraud ? (
        <p style={{ color: "red" }}>
           High Risk Property – Please be cautious
        </p>
      ) : (
        <p style={{ color: "green" }}>
           Low Risk Property – Looks safe
        </p>
      )}

      <p>Risk Level: {result.risk}</p>
    </div>
  );
};

export default CheckFraud;
