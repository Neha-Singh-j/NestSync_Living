import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaTrash } from "react-icons/fa";
import home from "../assets/home.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    images: [],
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check user authentication and associate the user (Buyer) with the property
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://nestsync-living.onrender.com/check-auth", {
          withCredentials: true, // Ensure cookies are sent
        });

        if (response.data.authenticated) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          navigate("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        navigate("/login"); // Redirect on failure
      }
    };

    checkAuth();
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imagePreviews],
    }));
  };

  // Remove uploaded image
  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      URL.revokeObjectURL(prev.images[index].preview);
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset any previous errors

    const formDataToSend = new FormData();
    formDataToSend.append("propertyType", propertyType);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("bedrooms", formData.bedrooms);
    formDataToSend.append("bathrooms", formData.bathrooms);
    formDataToSend.append("sqft", formData.sqft);

    formData.images.forEach((image) => {
      formDataToSend.append("images", image.file);
    });

    try {
      await axios.post("https://nestsync-living.onrender.com/property/sell", formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Property Listed Successfully");
      navigate("/buy");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to list property. Please try again.");
    }
  };

  // If the user is not authenticated, render nothing until the check is complete
  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen flex items-center justify-center p-6"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <img src={home} className="w-full h-full object-cover" alt="Background" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div>

      {step === 1 ? (
        <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What type of property are you selling?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-800"
              onClick={() => {
                setPropertyType("house");
                setStep(2);
              }}
            >
              <h2 className="text-2xl font-semibold">House</h2>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-800"
              onClick={() => {
                setPropertyType("apartment");
                setStep(2);
              }}
            >
              <h2 className="text-2xl font-semibold">Apartment</h2>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Form Section */}
          <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              List Your Property for Sale
            </h2>
            {errorMessage && (
              <p className="text-red-500 font-medium text-center">{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} className="w-full p-4 border rounded-lg focus:ring focus:ring-blue-300" required />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-4 border rounded-lg focus:ring focus:ring-blue-300" required />
              <input type="number" name="price" placeholder="Price ($)" value={formData.price} onChange={handleChange} className="w-full p-4 border rounded-lg focus:ring focus:ring-blue-300" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full p-4 border rounded-lg focus:ring focus:ring-blue-300" required />
                <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full p-4 border rounded-lg focus:ring focus:ring-blue-300" required />
              </div>
              <input type="number" name="sqft" placeholder="Square Feet" value={formData.sqft} onChange={handleChange} className="w-full p-4 border rounded-lg focus:ring focus:ring-blue-300" required />
              <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition font-bold text-lg">
                List Property
              </button>
            </form>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gray-50 p-10 flex flex-col items-center justify-center border-l w-full">
            <label className="w-full p-4 border rounded-lg flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300 transition text-center">
              <FaUpload className="text-gray-600 text-lg" />
              <span className="text-gray-700 font-medium">Upload Images</span>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <div className="grid grid-cols-3 gap-3 mt-4 w-full">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.preview} alt="Uploaded preview" className="h-24 w-full object-cover rounded-lg shadow-md border" />
                  <button onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sell;
