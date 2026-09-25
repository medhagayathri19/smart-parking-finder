import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import "../styles/parking.css";

const FilterPanel = ({
  filters,
  setFilters,
  areas = [],
  onResetFilters
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <aside className="filter-sidebar">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Filter size={18} color="var(--primary)" /> Filters
        </h3>
        <button
          onClick={onResetFilters}
          style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Area / Location */}
      <div className="filter-group">
        <label>Area / Location</label>
        <select name="area" value={filters.area} onChange={handleChange} className="filter-select">
          <option value="">All Locations</option>
          {areas.map((area, idx) => (
            <option key={idx} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Max Price Range */}
      <div className="filter-group">
        <label style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Max Price / Hour</span>
          <span style={{ color: "var(--primary)", fontWeight: "700" }}>₹{filters.maxPrice}</span>
        </label>
        <input
          type="range"
          name="maxPrice"
          min="15"
          max="100"
          step="5"
          value={filters.maxPrice}
          onChange={handleChange}
          style={{ width: "100%", accentColor: "var(--primary)" }}
        />
      </div>

      {/* Availability Toggle */}
      <div className="filter-group">
        <label style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="onlyAvailable"
            checked={filters.onlyAvailable}
            onChange={handleChange}
            style={{ width: "18px", height: "18px", accentColor: "var(--primary)" }}
          />
          <span style={{ fontSize: "0.9rem" }}>Show Available Only</span>
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="filter-group">
        <label>Minimum Rating</label>
        <select name="minRating" value={filters.minRating} onChange={handleChange} className="filter-select">
          <option value="0">Any Rating</option>
          <option value="4.0">4.0+ ★★★★☆</option>
          <option value="4.5">4.5+ ★★★★★</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterPanel;
