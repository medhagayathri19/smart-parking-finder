import React, { useState, useEffect } from "react";
import BookingCard from "../components/BookingCard";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { getBookings, cancelBooking } from "../utils/localStorage";
import { Calendar, AlertTriangle, CheckCircle, Clock, MapPin, Hash } from "lucide-react";
import "../styles/booking.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming or past
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelModalId, setCancelModalId] = useState(null);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleConfirmCancel = () => {
    if (cancelModalId) {
      const updated = cancelBooking(cancelModalId);
      setBookings(updated);
      setCancelModalId(null);
    }
  };

  // Tab Filtering
  const upcomingBookings = bookings.filter(b => b.status === "Confirmed" || b.status === "Active");
  const pastBookings = bookings.filter(b => b.status === "Completed" || b.status === "Cancelled");

  const currentList = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div className="page-header">
        <h1 className="page-title">My Parking Bookings</h1>
        <p className="page-subtitle">Track upcoming passes, view digital entry keys, and manage reservations.</p>
      </div>

      {/* Tabs */}
      <div className="booking-tabs">
        <button
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Bookings ({upcomingBookings.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          History & Cancelled ({pastBookings.length})
        </button>
      </div>

      {/* List */}
      {currentList.length > 0 ? (
        <div className="booking-cards-list">
          {currentList.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onViewDetails={(item) => setSelectedBooking(item)}
              onCancelBooking={(id) => setCancelModalId(id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title={activeTab === "upcoming" ? "No Upcoming Bookings" : "No Past Bookings"}
          message={activeTab === "upcoming" ? "You don't have any active parking reservations right now. Reserve your spot today!" : "Your past parking history will appear here once completed."}
          actionLabel="Find Parking Now"
          actionLink="/find-parking"
        />
      )}

      {/* Modal 1: Details View Modal */}
      <Modal
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        title="Booking Details & QR Pass"
      >
        {selectedBooking && (
          <div style={{ textAlign: "center" }}>
            <div className="ticket-qr-container">
              <div className="qr-placeholder-matrix"></div>
              <div className="qr-code-text">ENTRY CODE: {selectedBooking.id}</div>
            </div>

            <div style={{ textAlign: "left", background: "var(--bg-card-hover)", padding: "1.25rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
              <p style={{ marginBottom: "0.5rem" }}><strong>Location:</strong> {selectedBooking.parkingName}</p>
              <p style={{ marginBottom: "0.5rem" }}><strong>Address:</strong> {selectedBooking.address}</p>
              <p style={{ marginBottom: "0.5rem" }}><strong>Slot:</strong> <span style={{ color: "var(--primary)", fontWeight: "bold" }}>Slot {selectedBooking.slot}</span></p>
              <p style={{ marginBottom: "0.5rem" }}><strong>Date:</strong> {selectedBooking.date}</p>
              <p style={{ marginBottom: "0.5rem" }}><strong>Time:</strong> {selectedBooking.startTime} - {selectedBooking.endTime}</p>
              <p style={{ marginBottom: "0.5rem" }}><strong>Vehicle:</strong> {selectedBooking.vehicleNumber || "N/A"}</p>
              <p><strong>Total Paid:</strong> ₹{selectedBooking.totalAmount}</p>
            </div>

            <button className="btn btn-secondary" style={{ width: "100%" }} onClick={() => setSelectedBooking(null)}>
              Close Details
            </button>
          </div>
        )}
      </Modal>

      {/* Modal 2: Cancel Confirmation Modal */}
      <Modal
        isOpen={Boolean(cancelModalId)}
        onClose={() => setCancelModalId(null)}
        title="Confirm Cancellation"
      >
        <div style={{ textAlignment: "center" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(244, 63, 94, 0.15)", color: "var(--slot-occupied)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <AlertTriangle size={32} />
          </div>

          <p style={{ fontSize: "1.05rem", fontWeight: "600", marginBottom: "0.5rem", textAlign: "center" }}>
            Are you sure you want to cancel this booking?
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", marginBottom: "1.75rem" }}>
            This will release slot reservation and mark your booking as cancelled.
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setCancelModalId(null)}>
              Keep Booking
            </button>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleConfirmCancel}>
              Yes, Cancel It
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyBookings;
