import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import BookingSummary from "../components/BookingSummary";
import LoadingSpinner from "../components/LoadingSpinner";
import NotFound from "./NotFound";
import { getParkingById, saveBooking, getUser } from "../utils/localStorage";
import { Calendar, Clock, Car, User, Phone, ShieldCheck } from "lucide-react";
import canvasConfetti from "canvas-confetti";
import "../styles/booking.css";

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialSlot = searchParams.get("slot") || "";
  const navigate = useNavigate();

  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedSlot, setSelectedSlot] = useState(initialSlot);
  const [date, setDate] = useState(todayStr);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [duration, setDuration] = useState("3");
  const [vehicleNumber, setVehicleNumber] = useState("KA-01-EQ-9876");

  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = getParkingById(id);
    setParking(data);
    const u = getUser();
    setUser(u);
    if (u && u.vehicleNumber) {
      setVehicleNumber(u.vehicleNumber);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading booking setup..." />;
  if (!parking) return <NotFound message="Parking location not found for booking." />;

  // Calculate End Time string based on Start Time & Duration
  const calculateEndTime = (timeStr, durHours) => {
    try {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const totalHours = (hours + Number(durHours)) % 24;
      const endModifier = totalHours >= 12 ? "PM" : "AM";
      const displayHour = totalHours % 12 === 0 ? 12 : totalHours % 12;
      return `${displayHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${endModifier}`;
    } catch {
      return "01:00 PM";
    }
  };

  const handleConfirmBooking = () => {
    setIsProcessing(true);

    const endTime = calculateEndTime(startTime, duration);
    const totalAmount = parking.pricePerHour * Number(duration);

    const bookingPayload = {
      parkingId: parking.id,
      parkingName: parking.name,
      address: parking.address,
      slot: selectedSlot,
      date,
      startTime,
      endTime,
      duration: Number(duration),
      pricePerHour: parking.pricePerHour,
      totalAmount,
      vehicleNumber,
      userName: user ? user.name : "Guest Driver",
      userPhone: user ? user.phone : "+1 (555) 019-2834"
    };

    setTimeout(() => {
      const created = saveBooking(bookingPayload);
      setIsProcessing(false);

      // Trigger Confetti Effect
      try {
        canvasConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log("Confetti trigger skipped", err);
      }

      navigate(`/confirmation/${created.id}`);
    }, 800);
  };

  const availableSlotsList = parking.slots.filter(s => s.status === "available");

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div className="page-header">
        <h1 className="page-title">Reserve Parking Slot</h1>
        <p className="page-subtitle">Configure your stay, pick a timing, and complete your reservation.</p>
      </div>

      <div className="booking-grid">
        {/* Booking Form Card */}
        <div className="booking-form-card">
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Car color="var(--primary)" size={22} /> Booking Details
          </h3>

          <div className="form-group">
            <label>Parking Location</label>
            <input
              type="text"
              className="form-control"
              value={parking.name}
              readOnly
              style={{ background: "var(--bg-card-hover)", fontWeight: "700" }}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Select Parking Slot</label>
              <select
                className="form-control"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {!selectedSlot && <option value="">Select a Slot</option>}
                {parking.slots.map(s => (
                  <option key={s.id} value={s.id} disabled={s.status === "occupied"}>
                    Slot {s.id} {s.status === "occupied" ? "(Occupied)" : "(Available)"}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Vehicle Plate Number</label>
              <input
                type="text"
                className="form-control"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. KA-01-EQ-9876"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Reservation Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                min={todayStr}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <select
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="07:00 PM">07:00 PM</option>
                <option value="08:00 PM">08:00 PM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Parking Duration (Hours)</label>
            <select
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="1">1 Hour (Short stay)</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours (Recommended)</option>
              <option value="4">4 Hours</option>
              <option value="5">5 Hours</option>
              <option value="8">8 Hours (Full Day)</option>
              <option value="12">12 Hours (Overnight)</option>
            </select>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--bg-card-hover)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--primary)" }}>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}>Driver Information</h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Logged in as <strong>{user ? user.name : "Alex Johnson"}</strong> ({user ? user.phone : "+1 (555) 019-2834"}). Confirmation SMS & QR pass will be sent here.
            </p>
          </div>
        </div>

        {/* Summary Side Card */}
        <BookingSummary
          parking={parking}
          selectedSlot={selectedSlot}
          date={date}
          startTime={startTime}
          duration={duration}
          onConfirmBooking={handleConfirmBooking}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
};

export default Booking;
