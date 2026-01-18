import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import { BsFullscreen } from "react-icons/bs";

const BASE_URL = "http://localhost:3000";

const PropertyDisplay = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${BASE_URL}/property/${id}`);
        if (!response.ok) throw new Error("Property not found");
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!property) return <p className="text-center text-red-500">Property not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg grid md:grid-cols-2 gap-6">
      {/* Image Gallery */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
        <img
          src={`${BASE_URL}/${property.images[currentImage]}`}
          alt={property.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <button
          className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          <BsFullscreen size={20} />
        </button>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          onClick={() => setCurrentImage(prev => (prev > 0 ? prev - 1 : property.images.length - 1))}
        >
          ◀
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
          onClick={() => setCurrentImage(prev => (prev < property.images.length - 1 ? prev + 1 : 0))}
        >
          ▶
        </button>
      </div>

      {/* Property Info */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-gray-600 flex items-center mt-2">
          <FaMapMarkerAlt className="mr-2 text-red-500" /> {property.location}
        </p>
        <p className="text-xl font-bold text-green-700 my-2">${property.price.toLocaleString()}</p>
        <p className="text-gray-700">{property.description}</p>

        {/* Property Features */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center">
            <FaBed className="text-blue-500 mr-2" /> {property.bedrooms} Bedrooms
          </div>
          <div className="flex items-center">
            <FaBath className="text-blue-500 mr-2" /> {property.bathrooms} Bathrooms
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="text-blue-500 mr-2" /> {property.sqft} sqft
          </div>
          <div className="flex items-center capitalize">
            🏠 {property.propertyType}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold">
            Buy Now
          </button>
          <button className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Contact Seller
          </button>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img
            src={`${BASE_URL}/${property.images[currentImage]}`}
            alt="Full view"
            className="max-w-screen-lg max-h-screen object-contain"
          />
          <button
            className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full"
            onClick={() => setIsFullscreen(false)}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDisplay;