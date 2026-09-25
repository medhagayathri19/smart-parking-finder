import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Car, Search, Bookmark, Calendar, LayoutDashboard, User, LogIn, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getUser } from "../utils/localStorage";
import "../styles/navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <div className="logo-icon-wrapper">
            <Car size={22} />
          </div>
          <span>Park<span className="logo-highlight">Ease</span></span>
        </Link>

        {/* Desktop & Mobile Nav Links */}
        <nav className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
            end
          >
            <Car size={16} /> Home
          </NavLink>

          <NavLink
            to="/find-parking"
            className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <Search size={16} /> Find Parking
          </NavLink>

          <NavLink
            to="/my-bookings"
            className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <Calendar size={16} /> My Bookings
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <Bookmark size={16} /> Favorites
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-item-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <LayoutDashboard size={16} /> Dashboard
          </NavLink>
        </nav>

        {/* Actions (Theme Toggle & Profile/Login) */}
        <div className="navbar-actions">
          <ThemeToggle />

          {user && user.isLoggedIn ? (
            <Link to="/profile" className="user-profile-badge" title="Go to Profile">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="hide-mobile">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.88rem" }}>
              <LogIn size={16} /> Login
            </Link>
          )}

          {/* Hamburger Menu Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
