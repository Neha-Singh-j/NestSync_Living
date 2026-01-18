import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Buy/Sidebar";

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    propertyType: "",
    amenities: [],
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH PROPERTIES
  ========================= */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/property/all",
          { withCredentials: true }
        );

        setProperties(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* =========================
     FILTER LOGIC
  ========================= */
  const safeProperties = Array.isArray(properties) ? properties : [];
  const safeAmenities = Array.isArray(filters.amenities)
    ? filters.amenities
    : [];

  const filteredProperties = safeProperties.filter((property) => {
    const search = searchTerm.trim().toLowerCase();

    // 🔍 SEARCH (title OR location)
    const searchMatch =
      !search ||
      property.title?.toLowerCase().includes(search) ||
      property.location?.toLowerCase().includes(search);

    // 💰 PRICE
    const minPriceMatch =
      !filters.minPrice || property.price >= Number(filters.minPrice);
    const maxPriceMatch =
      !filters.maxPrice || property.price <= Number(filters.maxPrice);

    // 🛏 BED / 🛁 BATH
    const bedroomsMatch = filters.bedrooms
      ? property.bedrooms >= Number(filters.bedrooms)
      : true;

    const bathroomsMatch = filters.bathrooms
      ? property.bathrooms >= Number(filters.bathrooms)
      : true;

    // 🏠 PROPERTY TYPE (case-safe)
    const propertyTypeMatch = filters.propertyType
      ? property.propertyType?.toLowerCase() ===
        filters.propertyType.toLowerCase()
      : true;

    // 🧩 AMENITIES (ignored safely if not in backend)
    const amenitiesMatch =
      safeAmenities.length === 0 ||
      safeAmenities.every((a) =>
        Array.isArray(property.amenities)
          ? property.amenities.includes(a)
          : true
      );

    return (
      searchMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      bedroomsMatch &&
      bathroomsMatch &&
      propertyTypeMatch &&
      amenitiesMatch
    );
  });

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar filters={filters} setFilters={setFilters} />

      <div className="flex-1 pl-60">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8">
            Find Your Dream Home
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">
              Loading properties...
            </p>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Link key={property._id} to={`/property/${property._id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
