import React from "react";
import { Calendar, Clock, MapPin, Hash, DollarSign, XCircle, Eye } from "lucide-react";
import "../styles/booking.css";

const BookingCard = ({ booking, onViewDetails, onCancelBooking }) => {
  const {
    id,
    parkingName,
    address,
    slot,
    date,
    startTime,
    endTime,
    duration,
    totalAmount,
    status
  } = booking;

  let statusClass = "status-confirmed";
  if (status === "Completed") statusClass = "status-completed";
  else if (status === "Cancelled") statusClass = "status-cancelled";

  return (
    <div className="booking-item-card animate-fade-in">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{parkingName}</h3>
          <span className={`badge ${statusClass}`}>{status}</span>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "1rem" }}>
          <MapPin size={14} color="var(--primary)" /> {address}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          <span><strong>Slot:</strong> <span style={{ color: "var(--primary)" }}>{slot}</span></span>
          <span><Calendar size={14} style={{ display: "inline", marginRight: "4px" }} />{date}</span>
          <span><Clock size={14} style={{ display: "inline", marginRight: "4px" }} />{startTime} - {endTime} ({duration} hrs)</span>
          <span><Hash size={14} style={{ display: "inline", marginRight: "4px" }} />{id}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
        <div style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--primary)" }}>
          ₹{totalAmount}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="btn btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
            onClick={() => onViewDetails(booking)}
          >
            <Eye size={14} /> Details
          </button>

          {status === "Confirmed" && (
            <button
              className="btn btn-danger"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
              onClick={() => onCancelBooking(id)}
            >
              <XCircle size={14} /> Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
