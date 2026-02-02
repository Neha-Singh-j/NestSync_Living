import { useState } from "react";
import { motion } from "framer-motion";
import home from '../assets/home.jpg';
import googleIcon from '../assets/Icons/google2.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // Request for byuer signup
  async function handleBuyserSubmit(e){
    e.preventDefault();
    try {
        const response = await axios.post("https://nestsync-living.onrender.com/signup", { fullName, email, password }, { withCredentials: true });
        console.log(`User created successfully ${response}`);
        navigate("/login");

    }catch (err) {
        if (err.response && err.response.status === 400) {
          setErrorMessage(err.response.data.message); // Display "User already exists"
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        console.error(err);
    }
  }

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [sellerType, setSellerType] = useState("");

  const handleSelect = (type) => {
    setUserType(type);
    setStep(2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
    >
        {/* Background Image */}
        <div className="absolute inset-0">
            <img src={home} className="w-full h-full object-cover" alt="Background" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto text-center p-8 bg-white shadow-lg rounded-lg max-w-lg">
        {step === 1 ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Are You a Buyer or a Seller?</h1>
            <p className="text-lg text-gray-600 mb-10">Choose your role to continue registration.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-800"
                onClick={() => handleSelect("buyer")}
              >
                <h2 className="text-2xl font-semibold">Buyer</h2>
                <p className="mt-2 text-gray-600">Find your dream home with us.</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="p-6 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-blue-800"
                onClick={() => handleSelect("seller")}
              >
                <h2 className="text-2xl font-semibold">Seller</h2>
                <p className="mt-2 text-gray-600">Get the best market value for your property.</p>
              </motion.div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{userType === "buyer" ? "Buyer Registration" : "Seller Registration"}</h1>
            <p className="text-lg text-gray-600 mb-10">Fill in your details to continue.</p>
            <form className="space-y-4">

              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 border rounded-lg" 
                required 
                onChange={(e)=>setFullname(e.target.value)}/>

              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border rounded-lg" 
                required 
                onChange={(e)=>setEmail(e.target.value)}/>

              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-3 border rounded-lg" 
                required 
                onChange={(e)=>setPassword(e.target.value)}/>

              {userType === "seller" && (
                <>
                  <select 
                    className="w-full p-3 border rounded-lg" 
                    onChange={(e) => setSellerType(e.target.value)}
                    required
                  >
                    <option value="">Select Seller Type</option>
                    <option value="agent">Agent</option>
                    <option value="owner">Owner</option>
                  </select>
                  {sellerType === "agent" && (
                    <>
                      <input type="text" placeholder="Agent ID" className="w-full p-3 border rounded-lg" required />
                      <input type="text" placeholder="Location" className="w-full p-3 border rounded-lg" required />
                    </>
                  )}
                </>
              )}

            {errorMessage && <p className="text-red-600">{errorMessage}</p>} {/* Display error message */}

              <button 
                type="submit" 
                className="w-full bg-blue-800 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition cursor-pointer"
                onClick={handleBuyserSubmit}>
                    Register
              </button>
            </form>
            <div className="mt-6">
              <button className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg text-lg hover:bg-red-500 transition cursor-pointer">
                <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
                Sign Up with Google
              </button>
            </div>

            {/* Sign-up Link */}
            <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline cursor-pointer">
                Sign in
            </Link>
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Signup;