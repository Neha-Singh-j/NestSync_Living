import { useState } from "react";
import { FaMapMarkerAlt, FaHome, FaCheck } from "react-icons/fa";

const Sidebar = ({ filters, setFilters }) => {
  const toggleAmenity = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <div className="w-60 h-screen bg-white shadow p-4 fixed left-0 top-0 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Price Range */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">Price Range</label>
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) || 0 }))}
          className="w-full p-1 border-b border-gray-300 text-sm outline-none"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) || 1000000 }))}
          className="w-full p-1 border-b border-gray-300 text-sm outline-none mt-2"
        />
      </div>

      {/* Location */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium flex items-center">
          <FaMapMarkerAlt className="mr-1 text-xs" /> Location
        </label>
        <input
          type="text"
          value={filters.location || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Enter city"
          className="w-full p-1 border-b border-gray-300 text-sm outline-none"
        />
      </div>

      {/* Bedrooms */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium flex items-center">
          <FaHome className="mr-1 text-xs" /> Bedrooms
        </label>
        <select
          value={filters.bedrooms || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, bedrooms: Number(e.target.value) || "" }))}
          className="w-full p-1 border-b border-gray-300 text-sm outline-none"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}+
            </option>
          ))}
        </select>
      </div>

      {/* Bathrooms */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">Bathrooms</label>
        <select
          value={filters.bathrooms || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, bathrooms: Number(e.target.value) || "" }))}
          className="w-full p-1 border-b border-gray-300 text-sm outline-none"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}+
            </option>
          ))}
        </select>
      </div>

      {/* Square Footage */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">Sqft</label>
        <input
          type="number"
          value={filters.sqft || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, sqft: Number(e.target.value) || "" }))}
          placeholder="Min Sqft"
          className="w-full p-1 border-b border-gray-300 text-sm outline-none"
        />
      </div>

      {/* Property Type */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">Property Type</label>
        <select
          value={filters.propertyType || ""}
          onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
          className="w-full p-1 border-b border-gray-300 text-sm outline-none"
        >
          <option value="">Any</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
        </select>
      </div>

      {/* Amenities */}
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">Amenities</label>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {["Pool", "Gym", "Parking", "Garden", "Balcony"].map((amenity) => (
            <label key={amenity} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities?.includes(amenity) || false}
                onChange={() => toggleAmenity(amenity)}
                className="hidden"
              />
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center mr-1 ${
                  filters.amenities?.includes(amenity) ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400 text-gray-400"
                }`}
              >
                {filters.amenities?.includes(amenity) && <FaCheck className="text-xs" />}
              </div>
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => setFilters({ minPrice: 0, maxPrice: 1000000, location: "", bedrooms: "", bathrooms: "", sqft: "", propertyType: "", amenities: [] })}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium py-2 rounded transition-all duration-200"
      >
        Reset Filters
      </button>

      <div className="mt-10 text-center font-bold">
         <span className="font-bold"><span className="text-xl"> NestSync Living</span> </span>
         </div>
    </div>
  );
};

export default Sidebar;
