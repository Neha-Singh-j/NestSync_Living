import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaList,
  FaHeart,
  FaMoneyBill,
  FaCog,
  FaPlus,
} from "react-icons/fa";

const Dashboard = () => {
  const [myListings, setMyListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DASHBOARD DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingRes, wishlistRes] = await Promise.all([
          axios.get("http://localhost:3000/property/my-listings", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/wishlist", {
            withCredentials: true,
          }),
        ]);

        setMyListings(listingRes.data || []);
        setWishlist(wishlistRes.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     STATS
  ========================= */
  const propertiesListed = myListings.length;
  const portfolioValue = myListings.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  if (loading) {
    return <p className="p-10 text-center">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">
          NestSync Living
        </h2>

        <nav className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3 font-semibold text-blue-600">
            <FaHome /> Overview
          </div>
          <div className="flex items-center gap-3">
            <FaList /> My Listings
          </div>
          <div className="flex items-center gap-3">
            <FaHeart /> Saved Properties
          </div>
          <div className="flex items-center gap-3">
            <FaMoneyBill /> Transactions
          </div>
          <div className="flex items-center gap-3">
            <FaCog /> Settings
          </div>
        </nav>

        <button className="mt-10 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <FaPlus /> Add New Listing
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Properties Listed" value={propertiesListed} />
          <StatCard title="Saved Properties" value={wishlist.length} />
          <StatCard
            title="Portfolio Value"
            value={`₹${portfolioValue}`}
          />
        </div>

        {/* WISHLIST */}
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-4">Saved Properties</h3>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No saved properties.</p>
          )}
        </section>

        {/* MY LISTINGS */}
        <section>
          <h3 className="text-xl font-bold mb-4">My Listings</h3>
          {myListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myListings.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No listings yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

/* =========================
   COMPONENTS
========================= */

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const PropertyCard = ({ property }) => {
  const imageUrl =
    property.images?.length > 0
      ? `http://localhost:3000/${property.images[0]}`
      : "https://via.placeholder.com/400";

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img
        src={imageUrl}
        alt={property.title}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h4 className="font-bold">{property.title}</h4>
        <p className="text-sm text-gray-500">{property.location}</p>
        <p className="text-blue-600 font-semibold mt-2">
          ₹{property.price}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
