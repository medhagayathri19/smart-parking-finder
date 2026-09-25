import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, MapPin, Clock, DollarSign, Navigation, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Heart } from "lucide-react";
import SlotGrid from "../components/SlotGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { getParkingById, getFavorites, toggleFavorite } from "../utils/localStorage";
import "../styles/parking.css";

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = getParkingById(id);
    setParking(data);
    setFavorites(getFavorites());
    setLoading(false);
  }, [id]);

  if (loading) return <LoadingSpinner text="Fetching parking details..." />;
  if (!parking) return <NotFound message="Parking location not found." />;

  const isFav = favorites.includes(parking.id);

  const handleToggleFav = () => {
    const updated = toggleFavorite(parking.id);
    setFavorites(updated);
  };

  const handleContinueBooking = () => {
    if (!selectedSlot) return;
    navigate(`/booking/${parking.id}?slot=${selectedSlot}`);
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      {/* Back Button */}
      <Link to="/find-parking" className="btn btn-secondary" style={{ marginBottom: "1.5rem" }}>
        <ArrowLeft size={16} /> Back to Search
      </Link>

      {/* Hero Header with Background Image Overlay */}
      <div className="details-hero">
        <img src={parking.image} alt={parking.name} className="details-hero-img" />
        <div className="details-hero-overlay">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge badge-primary">{parking.area}</span>
                <span className={`badge ${parking.availableSlots > 0 ? "badge-success" : "badge-danger"}`}>
                  {parking.availableSlots > 0 ? `${parking.availableSlots} Slots Available` : "Full"}
                </span>
              </div>
              <h1 style={{ fontSize: "2.5rem", color: "#ffffff", fontWeight: "800", marginBottom: "0.5rem" }}>
                {parking.name}
              </h1>
              <p style={{ color: "#cbd5e1", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "1rem" }}>
                <MapPin size={18} color="var(--primary)" /> {parking.address}
              </p>
            </div>

            <button
              onClick={handleToggleFav}
              className="btn"
              style={{
                background: isFav ? "#f43f5e" : "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <Heart size={18} fill={isFav ? "#ffffff" : "none"} />
              {isFav ? "Saved to Favorites" : "Save Favorite"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="details-grid">
        {/* Left Column: Details & Slot Selector */}
        <div className="details-main">
          {/* Slot Grid Selection Component */}
          <SlotGrid
            slots={parking.slots}
            selectedSlot={selectedSlot}
            onSelectSlot={(slotId) => setSelectedSlot(slotId)}
          />

          {/* Description */}
          <div className="glass-panel" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>About this Facility</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", fontSize: "1rem" }}>
              {parking.description}
            </p>
          </div>

          {/* Facilities */}
          <div className="glass-panel" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "1.25rem" }}>Available Facilities & Amenities</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              {parking.facilities.map((fac, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.75rem 1rem",
                    background: "var(--bg-card-hover)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.95rem",
                    fontWeight: "600"
                  }}
                >
                  <CheckCircle2 size={18} color="var(--slot-available)" /> {fac}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Key Specs & Booking CTA */}
        <div>
          <div className="glass-panel" style={{ padding: "1.75rem", position: "sticky", top: "90px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-color)" }}>
              <div>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Hourly Rate</span>
                <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary)" }}>
                  ₹{parking.pricePerHour} <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "normal" }}>/ hr</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: "700", color: "#f59e0b" }}>
                <Star size={18} fill="#f59e0b" color="#f59e0b" /> {parking.rating} ({parking.reviews})
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
                <Clock size={18} color="var(--primary)" />
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Operating Hours</span>
                  <strong>{parking.openingTime} - {parking.closingTime}</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
                <Navigation size={18} color="var(--primary)" />
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Distance from You</span>
                  <strong>{parking.distance} away</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
                <ShieldCheck size={18} color="var(--slot-available)" />
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Security Status</span>
                  <strong>Guaranteed & CCTV Monitored</strong>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.9rem", fontSize: "1.05rem" }}
              disabled={!selectedSlot}
              onClick={handleContinueBooking}
            >
              Continue to Booking <ArrowRight size={18} />
            </button>

            {!selectedSlot && (
              <p style={{ textAlign: "center", color: "var(--slot-occupied)", fontSize: "0.82rem", marginTop: "0.75rem", fontWeight: "600" }}>
                * Please select an available slot on the grid first
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetails;
