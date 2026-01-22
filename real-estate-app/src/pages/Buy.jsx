import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PropertyCard from "../components/PropertyCard";
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
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH PROPERTIES */
  useEffect(() => {
    axios
      .get("http://localhost:3000/property/all", {
        withCredentials: true,
      })
      .then((res) => setProperties(res.data || []))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  /* FETCH WISHLIST */
  useEffect(() => {
    axios
      .get("http://localhost:3000/wishlist", {
        withCredentials: true,
      })
      .then((res) => {
        setWishlistIds(res.data.map((p) => p._id));
      })
      .catch(() => setWishlistIds([]));
  }, []);

  /* FILTER LOGIC (unchanged) */
  const filteredProperties = properties.filter((property) => {
    const search = searchTerm.toLowerCase();
    return (
      (!search ||
        property.title?.toLowerCase().includes(search) ||
        property.location?.toLowerCase().includes(search)) &&
      (!filters.minPrice || property.price >= filters.minPrice) &&
      (!filters.maxPrice || property.price <= filters.maxPrice)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 flex gap-6 px-6">
      <Sidebar filters={filters} setFilters={setFilters} />

      <div className="flex-1">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-center mb-8">
            Find Your Dream Home
          </h1>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Link key={property._id} to={`/property/${property._id}`}>
                  <PropertyCard
                    property={property}
                    initiallyWishlisted={wishlistIds.includes(property._id)}
                    onWishlistToggle={(id, added) => {
                      setWishlistIds((prev) =>
                        added
                          ? [...prev, id]
                          : prev.filter((x) => x !== id)
                      );
                    }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
