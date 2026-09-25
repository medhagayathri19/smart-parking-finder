import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Navigation, Heart, ArrowRight } from "lucide-react";
import "../styles/parking.css";

const ParkingCard = ({ parking, isFavorite = false, onToggleFavorite }) => {
  const {
    id,
    name,
    address,
    image,
    rating,
    reviews,
    pricePerHour,
    availableSlots,
    totalSlots,
    distance,
    facilities = []
  } = parking;

  return (
    <div className="parking-card animate-fade-in">
      <div className="card-image-wrap">
        <img src={image} alt={name} className="card-image" loading="lazy" />
        
        {/* Favorite Button */}
        <button
          className={`card-favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={18} fill={isFavorite ? "#ffffff" : "none"} />
        </button>

        {/* Price Tag */}
        <div className="card-price-badge">
          <span>₹{pricePerHour}</span> / hr
        </div>
      </div>

      <div className="card-content">
        <div className="card-header-row">
          <h3 className="card-title">{name}</h3>
          <div className="card-rating">
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{rating}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "normal" }}>
              ({reviews})
            </span>
          </div>
        </div>

        <p className="card-address">
          <MapPin size={14} color="var(--primary)" /> {address}
        </p>

        <div className="card-meta-row">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Navigation size={14} color="var(--primary)" /> {distance} away
          </span>

          <span className={`badge ${availableSlots > 0 ? "badge-success" : "badge-danger"}`}>
            {availableSlots > 0 ? `${availableSlots} Slots Available` : "Full / Occupied"}
          </span>
        </div>

        {facilities.length > 0 && (
          <div className="card-facilities">
            {facilities.slice(0, 3).map((facility, idx) => (
              <span key={idx} className="facility-chip">
                {facility}
              </span>
            ))}
            {facilities.length > 3 && (
              <span className="facility-chip" style={{ background: "var(--bg-card-hover)", color: "var(--text-muted)" }}>
                +{facilities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="card-actions">
          <Link to={`/parking/${id}`} className="btn btn-primary">
            View Parking <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;
