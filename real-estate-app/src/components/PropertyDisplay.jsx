import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsFullscreen } from "react-icons/bs";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const PropertyDisplay = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  //  Fraud states
  const [checkingFraud, setCheckingFraud] = useState(false);
  const [fraudResult, setFraudResult] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${BASE_URL}/property/${id}`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Property not found");

        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-600">Loading...</p>;

  if (!property)
    return (
      <p className="text-center text-red-500">Property not found.</p>
    );

  const images = property.images?.length
    ? property.images
    : ["https://via.placeholder.com/800"];

  //  Fraud check handler
  const handleCheckFraud = async () => {
    try {
      setCheckingFraud(true);
      setFraudResult(null);

      const res = await axios.post(
        `${BASE_URL}/api/ml/detect-fraud`,
        {
          price: property.price,
          area: property.sqft,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          amenities_count: property.amenities?.length || 0,
        },
        { withCredentials: true }
      );

      setFraudResult(res.data);
    } catch (err) {
      alert("Fraud check failed. Please try again.");
    } finally {
      setCheckingFraud(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg grid md:grid-cols-2 gap-6">
      {/* IMAGE GALLERY */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
        <img
          src={`${BASE_URL}/${images[currentImage]}`}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <button
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => setIsFullscreen(true)}
        >
          <BsFullscreen size={20} />
        </button>

        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
              onClick={() =>
                setCurrentImage((p) =>
                  p > 0 ? p - 1 : images.length - 1
                )
              }
            >
              
            </button>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
              onClick={() =>
                setCurrentImage((p) =>
                  p < images.length - 1 ? p + 1 : 0
                )
              }
            >
              
            </button>
          </>
        )}
      </div>

      {/* PROPERTY INFO */}
      <div>
        <h1 className="text-3xl font-bold">{property.title}</h1>

        <p className="text-gray-600 flex items-center mt-2">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          {property.location}
        </p>

        <p className="text-xl font-bold text-green-700 my-2">
          ₹{property.price.toLocaleString()}
        </p>

        <p className="text-gray-700">{property.description}</p>

        {/* FEATURES */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center">
            <FaBed className="mr-2" />
            {property.bedrooms} Bedrooms
          </div>
          <div className="flex items-center">
            <FaBath className="mr-2" />
            {property.bathrooms} Bathrooms
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-2" />
            {property.sqft} sqft
          </div>
          <div className="capitalize"> {property.propertyType}</div>
        </div>

        {/*  FRAUD CHECK (BEFORE BUY) */}
        <div className="mt-6">
          <button
            onClick={handleCheckFraud}
            disabled={checkingFraud}
            className="w-full border border-red-500 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50"
          >
            {checkingFraud ? "Checking Fraud..." : " Check Fraud Status"}
          </button>

          {fraudResult && (
            <div
              className={`mt-3 p-3 rounded-lg font-medium ${
                fraudResult.fraud
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {fraudResult.fraud
                ? " High Risk Property – Please be cautious"
                : " Low Risk Property – Looks safe"}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold">
            Buy Now
          </button>

          <button className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Contact Seller
          </button>
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img
            src={`${BASE_URL}/${images[currentImage]}`}
            alt="Full view"
            className="max-w-screen-lg max-h-screen object-contain"
          />
          <button
            className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full"
            onClick={() => setIsFullscreen(false)}
          >
            
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDisplay;
