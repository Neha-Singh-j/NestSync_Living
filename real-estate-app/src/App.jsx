import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";

import PublicLayout from "./layouts/PublicLayout";
// import DashboardLayout from "./layouts/DashboardLayout";

import PricePrediction from "./pages/PricePrediction";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";
import CheckFraud from "./pages/CheckFraud";

import PropertyDisplay from "./components/PropertyDisplay";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/*  PUBLIC ROUTES (WITH NAVBAR + FOOTER) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/property/:id" element={<PropertyDisplay />} />
            
            <Route path="/predict-price" element={<PricePrediction />} />
            <Route path="/check-fraud/:id" element={<CheckFraud />} />

            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
