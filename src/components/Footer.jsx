import React from "react";
import { Link } from "react-router-dom";
import { Car, Heart, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import "../styles/navbar.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="navbar-logo">
              <div className="logo-icon-wrapper">
                <Car size={22} />
              </div>
              <span>Park<span className="logo-highlight">Ease</span></span>
            </Link>
            <p>
              ParkEase makes urban parking effortless with real-time slot checking, instant online booking, and intelligent smart parking navigation.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/find-parking">Find Parking</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Popular Hubs</h4>
            <ul>
              <li><Link to="/find-parking?query=Downtown">Downtown Garage</Link></li>
              <li><Link to="/find-parking?query=Mall">Central Mall Parking</Link></li>
              <li><Link to="/find-parking?query=Airport">Airport Terminal</Link></li>
              <li><Link to="/find-parking?query=Tech">Cyber Tech Park</Link></li>
              <li><Link to="/find-parking?query=Railway">Railway Station</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support & Contact</h4>
            <ul>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MapPin size={16} color="var(--primary)" /> 100 Smart City Way
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--primary)" /> +1 (800) 555-PARK
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} color="var(--primary)" /> support@parkease.com
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <ShieldCheck size={16} color="var(--slot-available)" /> 24/7 Security Guarantee
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ParkEase Smart Parking Finder. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} color="#f43f5e" fill="#f43f5e" /> for smart urban mobility
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
