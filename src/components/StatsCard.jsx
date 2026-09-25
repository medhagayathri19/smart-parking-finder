import React from "react";
import "../styles/dashboard.css";

const StatsCard = ({ title, value, icon: Icon, colorClass = "icon-blue", subtitle }) => {
  return (
    <div className="dashboard-stat-card">
      <div className={`stat-icon-container ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <h4 style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: "500", marginBottom: "0.2rem" }}>
          {title}
        </h4>
        <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "var(--text-primary)", lineHeight: "1.1" }}>
          {value}
        </div>
        {subtitle && (
          <span style={{ fontSize: "0.75rem", color: "var(--slot-available)", fontWeight: "600" }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
