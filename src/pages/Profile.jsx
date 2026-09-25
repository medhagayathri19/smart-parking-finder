import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, saveUser, logoutUser, clearBookingHistory } from "../utils/localStorage";
import ThemeToggle from "../components/ThemeToggle";
import Modal from "../components/Modal";
import { User, Mail, Phone, Car, Save, LogOut, Trash2, Bell, Shield, CheckCircle } from "lucide-react";
import "../styles/dashboard.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "Car (Sedan)",
    vehicleNumber: ""
  });

  const [notifications, setNotifications] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [clearModalOpen, setClearModalOpen] = useState(false);

  useEffect(() => {
    const current = getUser();
    if (current) {
      setUserData({
        name: current.name || "Alex Johnson",
        email: current.email || "alex.johnson@example.com",
        phone: current.phone || "+1 (555) 019-2834",
        vehicleType: current.vehicleType || "Car (Sedan)",
        vehicleNumber: current.vehicleNumber || "KA-01-EQ-9876"
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const existing = getUser() || {};
    const updated = {
      ...existing,
      ...userData,
      isLoggedIn: true
    };
    saveUser(updated);

    setSuccessMsg("Profile details updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleClearHistory = () => {
    clearBookingHistory();
    setClearModalOpen(false);
    setSuccessMsg("Booking history has been cleared.");
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div className="page-header">
        <h1 className="page-title">User Account & Settings</h1>
        <p className="page-subtitle">Manage your personal profile, vehicle preferences, and security settings.</p>
      </div>

      {successMsg && (
        <div style={{ padding: "1rem", background: "var(--slot-available-bg)", color: "var(--slot-available)", borderRadius: "var(--radius-md)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      <div className="profile-container">
        {/* Sidebar Card */}
        <div className="profile-sidebar-card">
          <div className="profile-avatar-large">
            {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}>{userData.name}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem" }}>{userData.email}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button className="btn btn-outline" style={{ width: "100%" }} onClick={handleLogout}>
              <LogOut size={16} /> Logout Account
            </button>

            <button className="btn btn-danger" style={{ width: "100%" }} onClick={() => setClearModalOpen(true)}>
              <Trash2 size={16} /> Clear Booking History
            </button>
          </div>
        </div>

        {/* Details Form Card */}
        <div className="profile-details-card">
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-color)" }}>
            Personal Profile & Preferences
          </h3>

          <form onSubmit={handleSaveProfile}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Vehicle Type</label>
                <select
                  name="vehicleType"
                  className="form-control"
                  value={userData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="Car (Sedan)">Car (Sedan)</option>
                  <option value="Car (SUV)">Car (SUV / Crossover)</option>
                  <option value="Car (Hatchback)">Car (Hatchback)</option>
                  <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                  <option value="Motorcycle / Scooter">Motorcycle / Scooter</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Default Vehicle License Plate</label>
              <input
                type="text"
                name="vehicleNumber"
                className="form-control"
                value={userData.vehicleNumber}
                onChange={handleChange}
                placeholder="e.g. KA-01-EQ-9876"
              />
            </div>

            <h3 style={{ fontSize: "1.1rem", marginTop: "2rem", marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border-color)" }}>
              App Preferences
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "var(--bg-card-hover)", borderRadius: "var(--radius-md)" }}>
                <div>
                  <strong>Color Theme Mode</strong>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Toggle between light and dark visual aesthetics</span>
                </div>
                <ThemeToggle />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "var(--bg-card-hover)", borderRadius: "var(--radius-md)" }}>
                <div>
                  <strong>Booking SMS & Email Notifications</strong>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Receive reminders 30 mins before reservation start time</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  style={{ width: "20px", height: "20px", accentColor: "var(--primary)", cursor: "pointer" }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem" }}>
              <Save size={16} /> Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Clear History Confirmation Modal */}
      <Modal
        isOpen={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
        title="Clear Booking History"
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            Are you sure you want to delete all saved booking records from localStorage?
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setClearModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleClearHistory}>
              Clear History
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
