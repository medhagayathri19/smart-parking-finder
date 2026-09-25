import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import ParkingCard from "../components/ParkingCard";
import { getBookings, getFavorites, getParkingLocations, toggleFavorite, getUser } from "../utils/localStorage";
import { Calendar, CheckCircle, Clock, DollarSign, Bookmark, ArrowRight, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    setUser(getUser());
    setBookings(getBookings());
    setFavorites(getFavorites());
    setAllLocations(getParkingLocations());
  }, []);

  const handleToggleFav = (id) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  // Calculated Stats
  const totalBookingsCount = bookings.length;
  const activeBookingsCount = bookings.filter(b => b.status === "Confirmed" || b.status === "Active").length;
  const completedBookingsCount = bookings.filter(b => b.status === "Completed").length;
  const totalSpentAmount = bookings.reduce((sum, b) => sum + (b.status !== "Cancelled" ? Number(b.totalAmount) : 0), 0);

  // Chart Data Preparation
  const monthlyData = [
    { month: "May", bookings: 3, spend: 240 },
    { month: "Jun", bookings: 5, spend: 390 },
    { month: "Jul", bookings: 8, spend: 520 },
    { month: "Aug", bookings: 12, spend: 780 },
    { month: "Sep", bookings: bookings.length > 0 ? bookings.length * 4 : 14, spend: totalSpentAmount > 0 ? totalSpentAmount : 960 }
  ];

  const statusPieData = [
    { name: "Active", value: activeBookingsCount || 1, color: "#10b981" },
    { name: "Completed", value: completedBookingsCount || 1, color: "#3b82f6" },
    { name: "Cancelled", value: bookings.filter(b => b.status === "Cancelled").length || 0, color: "#f43f5e" }
  ];

  const favoriteLocationsList = allLocations.filter(loc => favorites.includes(loc.id));

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="page-title">Welcome back, {user ? user.name.split(" ")[0] : "Driver"}! 👋</h1>
          <p className="page-subtitle">Here is a real-time overview of your parking activity and statistics.</p>
        </div>
        <Link to="/find-parking" className="btn btn-primary">
          <TrendingUp size={16} /> Book New Parking
        </Link>
      </div>

      {/* 4 Quick Metric Cards */}
      <div className="dashboard-grid">
        <StatsCard
          title="Total Bookings"
          value={totalBookingsCount}
          icon={Calendar}
          colorClass="icon-blue"
          subtitle="+12% this month"
        />
        <StatsCard
          title="Active Bookings"
          value={activeBookingsCount}
          icon={Clock}
          colorClass="icon-green"
          subtitle="Ready to use"
        />
        <StatsCard
          title="Completed Bookings"
          value={completedBookingsCount}
          icon={CheckCircle}
          colorClass="icon-purple"
          subtitle="Past stays"
        />
        <StatsCard
          title="Total Amount Spent"
          value={`₹${totalSpentAmount}`}
          icon={DollarSign}
          colorClass="icon-amber"
          subtitle="Lifetime total"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Chart 1: Monthly Usage & Spend Bar Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Monthly Parking Activity</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Past 5 months</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", borderRadius: "8px" }}
                />
                <Bar dataKey="spend" name="Amount Spent (₹)" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Booking Status Pie Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3>Booking Status Breakdown</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>All-time distribution</span>
          </div>
          <div className="chart-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="dashboard-table-card">
        <div className="chart-card-header">
          <h3>Recent Booking History</h3>
          <Link to="/my-bookings" style={{ color: "var(--primary)", fontSize: "0.9rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Parking Location</th>
                  <th>Slot</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id}>
                    <td><strong style={{ fontFamily: "monospace", color: "var(--primary)" }}>{b.id}</strong></td>
                    <td>{b.parkingName}</td>
                    <td><span className="badge badge-primary">Slot {b.slot}</span></td>
                    <td>{b.date} ({b.startTime})</td>
                    <td><strong>₹{b.totalAmount}</strong></td>
                    <td>
                      <span className={`badge ${b.status === "Confirmed" ? "status-confirmed" : b.status === "Completed" ? "status-completed" : "status-cancelled"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)", padding: "1rem 0" }}>No recent bookings found.</p>
        )}
      </div>

      {/* Favorite Parking Locations Row */}
      {favoriteLocationsList.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <div className="popular-header">
            <h2 className="section-title" style={{ textAlign: "left" }}>Your Favorite Parking Hubs</h2>
            <Link to="/favorites" className="btn btn-outline">
              Manage Favorites <Bookmark size={16} />
            </Link>
          </div>

          <div className="cards-grid">
            {favoriteLocationsList.slice(0, 3).map((loc) => (
              <ParkingCard
                key={loc.id}
                parking={loc}
                isFavorite={true}
                onToggleFavorite={handleToggleFav}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
