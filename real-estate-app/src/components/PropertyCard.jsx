import { useState, useEffect } from "react";
import { FaBed, FaBath, FaRulerCombined, FaHeart } from "react-icons/fa";
import axios from "axios";

const PropertyCard = ({
  property,
  initiallyWishlisted = false,
  onWishlistToggle,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(initiallyWishlisted);

  //  keep state in sync when parent updates
  useEffect(() => {
    setIsWishlisted(initiallyWishlisted);
  }, [initiallyWishlisted]);

  const imageUrl =
    property.images?.length > 0
      ? `https://nestsync-living.onrender.com/${property.images[0]}`
      : "https://via.placeholder.com/400";

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isWishlisted) {
        await axios.delete(
          `https://nestsync-living.onrender.com/wishlist/${property._id}`,
          { withCredentials: true }
        );
        setIsWishlisted(false);
        onWishlistToggle?.(property._id, false);
      } else {
        await axios.post(
          `https://nestsync-living.onrender.com/wishlist/${property._id}`,
          {},
          { withCredentials: true }
        );
        setIsWishlisted(true);
        onWishlistToggle?.(property._id, true);
      }
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
      {/*  WISHLIST */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow z-10"
      >
        <FaHeart
          className={`text-lg transition ${
            isWishlisted ? "text-red-500" : "text-gray-300"
          }`}
        />
      </button>

      <img
        src={imageUrl}
        alt={property.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>

        <div className="flex justify-between mt-4">
          <p className="text-blue-600 font-bold">₹{property.price}</p>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <FaBed /> {property.bedrooms}
            </div>
            <div className="flex items-center gap-1">
              <FaBath /> {property.bathrooms}
            </div>
            <div className="flex items-center gap-1">
              <FaRulerCombined /> {property.sqft}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
