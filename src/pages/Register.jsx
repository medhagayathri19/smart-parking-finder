import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, UserPlus, AlertCircle } from "lucide-react";
import { saveUser } from "../utils/localStorage";
import "../styles/dashboard.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    vehicleNumber: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "+1 (555) 019-2834",
      vehicleType: "Car (Sedan)",
      vehicleNumber: formData.vehicleNumber || "KA-01-EQ-9876",
      isLoggedIn: true
    };

    saveUser(newUser);
    navigate("/dashboard");
  };

  return (
    <div className="container auth-wrapper">
      <div className="auth-card animate-fade-in" style={{ maxWidth: "500px" }}>
        <div className="auth-header">
          <div className="logo-icon-wrapper" style={{ margin: "0 auto 1rem" }}>
            <Car size={24} />
          </div>
          <h2>Create ParkEase Account</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Join thousands of smart drivers reserving hassle-free parking
          </p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(244, 63, 94, 0.15)", color: "var(--slot-occupied)", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex Johnson"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Default Vehicle License Plate</label>
            <input
              type="text"
              name="vehicleNumber"
              className="form-control"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. KA-01-EQ-9876"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", padding: "0.85rem" }}>
            <UserPlus size={18} /> Complete Registration
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: "600" }}>
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
