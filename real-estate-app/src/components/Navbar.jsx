import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import nestSyncLogo from "../assets/nestSync.png";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isBuyPage = location.pathname === "/buy";
  const { isAuthenticated, user, loading, checkAuth } = useAuth();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Sell", path: "/sell" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://nestsync-living.onrender.com/logout",
        {},
        { withCredentials: true }
      );

      setIsAuthenticated(false);   //  force UI update
      navigate("/");               //  redirect

    } catch (error) {
      console.error("Logout failed", error);
    }
  };


  return (
    <nav className="w-full bg-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">

        {/* LOGO */}
        {/* LOGO */}
<Link to="/" className="flex items-center gap-3">
  <img
    src={nestSyncLogo}
    alt="NestSync Logo"
    className="w-18 h-10"
  />
  <span className="text-xl font-bold text-blue-600">
    NestSync Living
  </span>
</Link>

        {/* SEARCH */}
        {isBuyPage && (
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 border-b outline-none"
          />
        )}

        {/* LINKS */}
        <ul className="flex items-center gap-6">
          {pages.map(
            (p) =>
              location.pathname !== p.path && (
                <li key={p.name}>
                  <Link to={p.path} className="hover:text-blue-600">
                    {p.name}
                  </Link>
                </li>
              )
          )}

          {isAuthenticated && location.pathname !== "/dashboard" && (
            <li>
              <Link to="/dashboard" className="font-semibold text-blue-600">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* USER SECTION */}
        <div className="flex items-center gap-4">
          {loading ? (
            <span>...</span>
          ) : isAuthenticated && user ? (
            <>
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>

              {/* Name */}
              <span className="font-medium">
                {user.fullName}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
