import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import FindParking from "./pages/FindParking";
import ParkingDetails from "./pages/ParkingDetails";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Utils
import { initLocalStorage, getStoredTheme } from "./utils/localStorage";

// Styles
import "./styles/global.css";

function App() {
  useEffect(() => {
    // Initialize Local Storage & Theme
    initLocalStorage();
    const savedTheme = getStoredTheme();
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-parking" element={<FindParking />} />
            <Route path="/parking/:id" element={<ParkingDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/confirmation/:bookingId" element={<Confirmation />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
