import React from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  // Ensure the image URL is properly formatted
  const imageUrl = property.images?.length
    ? `http://localhost:3000/${property.images[0]}`
    : "https://via.placeholder.com/400"; // Fallback image

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={property.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>

        {/* Price + Property Details (Icons) in One Row */}
        <div className="flex items-center justify-between mt-4 text-gray-700">
          <p className="text-blue-600 font-bold text-lg">${property.price}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaBed className="text-black" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-black" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRulerCombined className="text-black" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
