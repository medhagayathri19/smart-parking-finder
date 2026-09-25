import React from "react";
import { Search, MapPin, X } from "lucide-react";
import "../styles/home.css";

const SearchBar = ({ searchQuery, setSearchQuery, onSearchSubmit, placeholder = "Search location, area or parking name..." }) => {
  return (
    <form
      className="hero-search-box"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearchSubmit) onSearchSubmit(searchQuery);
      }}
    >
      <div className="search-input-group">
        <MapPin className="search-icon" size={20} />
        <input
          type="text"
          className="hero-search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <button type="submit" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem" }}>
        <Search size={18} /> Find Parking
      </button>
    </form>
  );
};

export default SearchBar;
