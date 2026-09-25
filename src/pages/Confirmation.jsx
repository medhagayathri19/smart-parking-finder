import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Calendar, Clock, MapPin, Hash, Car, ArrowLeft, Download, Share2 } from "lucide-react";
import { getBookings } from "../utils/localStorage";
import NotFound from "./NotFound";
import "../styles/booking.css";

const Confirmation = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const all = getBookings();
    const found = all.find(b => b.id === bookingId);
    setBooking(found || null);
  }, [bookingId]);

  if (!booking) return <NotFound message="Booking details not found." />;

  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <div className="confirmation-card animate-fade-in">
        {/* Animated Checkmark Badge */}
        <div className="success-badge-wrapper">
          <CheckCircle2 size={48} color="var(--slot-available)" />
        </div>

        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "0.5rem" }}>
          Booking Confirmed!
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "2rem" }}>
          Your parking spot is guaranteed and ready for your arrival.
        </p>

        {/* QR Ticket Display */}
        <div className="ticket-qr-container">
          <div className="qr-placeholder-matrix"></div>
          <div className="qr-code-text">ENTRY CODE: {booking.id}</div>
          <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Scan at gate barcode reader</span>
        </div>

        {/* Receipt Details Box */}
        <div style={{ background: "var(--bg-card-hover)", borderRadius: "var(--radius-md)", padding: "1.5rem", textAlign: "left", marginBottom: "2rem", border: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Booking ID:</span>
            <strong style={{ fontFamily: "monospace", color: "var(--primary)" }}>{booking.id}</strong>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", fontSize: "0.95rem" }}>
            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Location</span>
              <strong>{booking.parkingName}</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Assigned Slot</span>
              <strong style={{ color: "var(--primary)", fontSize: "1.2rem" }}>Slot {booking.slot}</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Date</span>
              <strong>{booking.date}</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Timing</span>
              <strong>{booking.startTime} - {booking.endTime}</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Duration</span>
              <strong>{booking.duration} Hours</strong>
            </div>

            <div>
              <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Amount Paid</span>
              <strong style={{ color: "var(--slot-available)", fontSize: "1.1rem" }}>₹{booking.totalAmount}</strong>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/my-bookings" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem" }}>
            View My Bookings
          </Link>

          <Link to="/" className="btn btn-secondary" style={{ padding: "0.85rem 1.75rem" }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
