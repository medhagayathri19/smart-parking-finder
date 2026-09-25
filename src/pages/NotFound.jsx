import React from "react";
import { Link } from "react-router-dom";
import { MapPinOff, ArrowLeft, Search } from "lucide-react";
import "../styles/dashboard.css";

const NotFound = ({ message = "The page or parking spot you are looking for doesn't exist or was moved." }) => {
  return (
    <div className="container" style={{ paddingTop: "5rem", paddingBottom: "6rem", textAlign: "center" }}>
      <div className="empty-state animate-fade-in" style={{ maxWidth: "550px", margin: "0 auto", padding: "3.5rem 2rem" }}>
        <div className="empty-icon" style={{ background: "rgba(244, 63, 94, 0.15)", color: "var(--slot-occupied)" }}>
          <MapPinOff size={40} />
        </div>

        <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "0.25rem" }}>404</h1>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Page Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", lineHeight: "1.6" }}>
          {message}
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Home
          </Link>
          <Link to="/find-parking" className="btn btn-secondary">
            <Search size={16} /> Find Parking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
