import React from "react";
import { ShieldCheck, ArrowRight, CreditCard } from "lucide-react";
import "../styles/booking.css";

const BookingSummary = ({
  parking,
  selectedSlot,
  date,
  startTime,
  duration,
  onConfirmBooking,
  isProcessing = false
}) => {
  const pricePerHour = parking ? parking.pricePerHour : 0;
  const totalAmount = pricePerHour * Number(duration || 1);

  return (
    <div className="booking-summary-card">
      <h3 className="summary-title">Booking Summary</h3>

      <div className="summary-item">
        <span className="label">Parking Location</span>
        <span className="value">{parking ? parking.name : "-"}</span>
      </div>

      <div className="summary-item">
        <span className="label">Selected Slot</span>
        <span className="value" style={{ color: "var(--primary)", fontSize: "1.1rem" }}>
          {selectedSlot || "None"}
        </span>
      </div>

      <div className="summary-item">
        <span className="label">Date</span>
        <span className="value">{date || "-"}</span>
      </div>

      <div className="summary-item">
        <span className="label">Start Time</span>
        <span className="value">{startTime || "-"}</span>
      </div>

      <div className="summary-item">
        <span className="label">Duration</span>
        <span className="value">{duration} {Number(duration) === 1 ? "Hour" : "Hours"}</span>
      </div>

      <div className="summary-item">
        <span className="label">Rate per Hour</span>
        <span className="value">₹{pricePerHour} / hr</span>
      </div>

      <div className="summary-total">
        <div>
          <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem" }}>Total Payable</span>
          <span className="total-price">₹{totalAmount}</span>
        </div>

        <span className="badge badge-success" style={{ display: "flex", gap: "0.2rem" }}>
          <ShieldCheck size={14} /> Instant Access
        </span>
      </div>

      <button
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "1.5rem", padding: "0.9rem" }}
        disabled={!selectedSlot || !date || !startTime || isProcessing}
        onClick={() => onConfirmBooking({ totalAmount })}
      >
        {isProcessing ? "Processing..." : (
          <>
            <CreditCard size={18} /> Confirm Booking <ArrowRight size={18} />
          </>
        )}
      </button>

      <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "1rem" }}>
        🔒 Free cancellation up to 1 hour before start time.
      </p>
    </div>
  );
};

export default BookingSummary;
