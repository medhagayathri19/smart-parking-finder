import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, LogIn, Lock, Mail, AlertCircle } from "lucide-react";
import { loginDemoUser } from "../utils/localStorage";
import "../styles/dashboard.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    loginDemoUser(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="container auth-wrapper">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <div className="logo-icon-wrapper" style={{ margin: "0 auto 1rem" }}>
            <Car size={24} />
          </div>
          <h2>Welcome Back to ParkEase</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Login to manage your parking bookings & account
          </p>
        </div>

        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(244, 63, 94, 0.15)", color: "var(--slot-occupied)", borderRadius: "var(--radius-md)", marginBottom: "1.25rem", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem", padding: "0.85rem" }}>
            <LogIn size={18} /> Sign In
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>
            Register Now
          </Link>
        </p>

        <div style={{ marginTop: "1.5rem", padding: "0.75rem", background: "var(--bg-card-hover)", borderRadius: "var(--radius-sm)", textAlign: "center", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          💡 <strong>Demo Credentials:</strong> Click 'Sign In' to proceed with sample account.
        </div>
      </div>
    </div>
  );
};

export default Login;
