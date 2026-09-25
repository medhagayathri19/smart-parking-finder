import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, MapPin, ShieldCheck, Zap, Calendar, LayoutDashboard, Car, ArrowRight, CheckCircle } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ParkingCard from "../components/ParkingCard";
import { getParkingLocations, getFavorites, toggleFavorite } from "../utils/localStorage";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [parkingData, setParkingData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setParkingData(getParkingLocations());
    setFavorites(getFavorites());
  }, []);

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      navigate(`/find-parking?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/find-parking");
    }
  };

  const handleToggleFav = (id) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const popularLocations = parkingData.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="container hero-content">
          <div className="hero-badge animate-fade-in">
            <Zap size={14} /> Smart Urban Mobility Solution
          </div>

          <h1 className="hero-title animate-fade-in">
            Find Your Perfect <br />Parking Spot
          </h1>

          <p className="hero-subtitle animate-fade-in">
            Park faster. Park smarter. Get where you're going without the parking stress.
          </p>

          <div className="animate-fade-in">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              placeholder="Search by city, landmark, or street name..."
            />
          </div>
        </div>
      </section>

      {/* Quick Statistics Section */}
      <section className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <Car size={24} />
            </div>
            <div className="stat-number">120+</div>
            <div className="stat-label">Parking Spots</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <MapPin size={24} />
            </div>
            <div className="stat-number">35+</div>
            <div className="stat-label">Locations</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <Calendar size={24} />
            </div>
            <div className="stat-number">500+</div>
            <div className="stat-label">Bookings</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Availability</div>
          </div>
        </div>
      </section>

      {/* Why Choose ParkEase Section */}
      <section className="container" style={{ marginBottom: "6rem" }}>
        <div className="section-title-wrap">
          <h2 className="section-title">Why Choose ParkEase?</h2>
          <p className="section-subtitle">Experience seamless smart parking built for modern drivers</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search size={28} />
            </div>
            <h3>Easy Parking Search</h3>
            <p>Locate available garages and open spaces near your destination with instant distance and price comparison.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircle size={28} />
            </div>
            <h3>Real-Time Slot Availability</h3>
            <p>View visual floor maps showing live green (available) and red (occupied) slots updated in real-time.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3>Quick Booking</h3>
            <p>Reserve your exact parking bay in seconds and receive an instant digital QR check-in pass.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={28} />
            </div>
            <h3>Secure Parking</h3>
            <p>All partner garages feature 24/7 CCTV surveillance, biometric gate entry, and security guards.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <LayoutDashboard size={28} />
            </div>
            <h3>Smart Dashboard</h3>
            <p>Track your active bookings, spending analytics, and parking habits through an intuitive dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={28} />
            </div>
            <h3>Easy Booking Management</h3>
            <p>Modify duration or cancel bookings with 1-click hassle-free refund processing directly from your account.</p>
          </div>
        </div>
      </section>

      {/* Popular Parking Locations Section */}
      <section className="container" style={{ marginBottom: "5rem" }}>
        <div className="popular-header">
          <div>
            <h2 className="section-title" style={{ textAlign: "left" }}>Popular Parking Locations</h2>
            <p className="section-subtitle" style={{ textAlign: "left" }}>Highest rated parking spots with maximum convenience</p>
          </div>
          <Link to="/find-parking" className="btn btn-outline">
            View All Locations <ArrowRight size={16} />
          </Link>
        </div>

        <div className="cards-grid">
          {popularLocations.map((parking) => (
            <ParkingCard
              key={parking.id}
              parking={parking}
              isFavorite={favorites.includes(parking.id)}
              onToggleFavorite={handleToggleFav}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
