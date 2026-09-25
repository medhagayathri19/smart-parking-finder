import React from "react";
import { Link } from "react-router-dom";
import { Search, MapPinOff } from "lucide-react";
import "../styles/dashboard.css";

const EmptyState = ({
  icon: Icon = MapPinOff,
  title = "No Parking Locations Found",
  message = "Try changing your search keywords or adjusting your filters.",
  actionLabel,
  actionLink,
  onActionClick
}) => {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-icon">
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ color: "var(--text-muted)", maxWidth: "450px", margin: "0 auto 1.5rem", fontSize: "0.95rem" }}>
        {message}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          <Search size={16} /> {actionLabel}
        </Link>
      )}

      {actionLabel && onActionClick && !actionLink && (
        <button onClick={onActionClick} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
