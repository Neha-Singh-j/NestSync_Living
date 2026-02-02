import { useState } from 'react';
import home from '../assets/home.jpg';
import googleIcon from '../assets/Icons/google2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Import Auth Context

const Login = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth(); // Get checkAuth from context
  const [email, setEmail] = useState(""); // Initialized state
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle login
  async function handleBuyserSubmit(e) {
    e.preventDefault();
    try {
        await axios.post("http://nestsync-living.onrender.com/login", { email, password }, { withCredentials: true });
        console.log("User logged in successfully");
        checkAuth(); //  Ensure navbar updates
        navigate("/buy");
    } catch (err) {
        setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
        console.error(err);
    }
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={home} className="w-full h-full object-cover" alt="Background" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Box */}
      <div className="relative z-10 bg-white p-8 md:p-12 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>
        <p className="text-gray-600 text-center mt-2">Sign in to access your dashboard.</p>

        {/* Login Form */}
        <form className="mt-6 space-y-4" onSubmit={handleBuyserSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">Forgot password?</a>
          </div>

          {errorMessage && <p className="text-red-600">{errorMessage}</p>} {/* Display error message */}

          <button 
            type="submit" 
            className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <button className="mt-4 w-full bg-red-600 text-white p-3 rounded-lg flex items-center justify-center gap-3 hover:bg-red-500 transition cursor-pointer">
          <img src={googleIcon} alt="Google Logo" className="w-6 h-6" />
          Sign in with Google
        </button>

        {/* Sign-up Link */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
