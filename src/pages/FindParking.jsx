import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ParkingCard from "../components/ParkingCard";
import EmptyState from "../components/EmptyState";
import { getParkingLocations, getFavorites, toggleFavorite } from "../utils/localStorage";
import { ArrowUpDown } from "lucide-react";
import "../styles/parking.css";

const FindParking = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [parkingList, setParkingList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("nearest");

  const [filters, setFilters] = useState({
    area: "",
    maxPrice: "100",
    onlyAvailable: false,
    minRating: "0"
  });

  useEffect(() => {
    setParkingList(getParkingLocations());
    setFavorites(getFavorites());
  }, []);

  const handleToggleFav = (id) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({
      area: "",
      maxPrice: "100",
      onlyAvailable: false,
      minRating: "0"
    });
    setSortBy("nearest");
  };

  // Extract unique areas for the filter dropdown
  const areas = useMemo(() => {
    const setOfAreas = new Set(parkingList.map(p => p.area).filter(Boolean));
    return Array.from(setOfAreas);
  }, [parkingList]);

  // Filtering & Sorting Logic
  const filteredParking = useMemo(() => {
    return parkingList.filter((item) => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesAddress = item.address.toLowerCase().includes(q);
        const matchesArea = item.area.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress && !matchesArea) return false;
      }

      // Filter Area
      if (filters.area && item.area !== filters.area) {
        return false;
      }

      // Filter Price
      if (Number(item.pricePerHour) > Number(filters.maxPrice)) {
        return false;
      }

      // Filter Available Only
      if (filters.onlyAvailable && item.availableSlots <= 0) {
        return false;
      }

      // Filter Min Rating
      if (Number(item.rating) < Number(filters.minRating)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "cheapest") {
        return a.pricePerHour - b.pricePerHour;
      } else if (sortBy === "highest_rated") {
        return b.rating - a.rating;
      } else if (sortBy === "most_available") {
        return b.availableSlots - a.availableSlots;
      } else {
        // nearest (distance string to float)
        const distA = parseFloat(a.distance) || 0;
        const distB = parseFloat(b.distance) || 0;
        return distA - distB;
      }
    });
  }, [parkingList, searchQuery, filters, sortBy]);

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div className="page-header" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 className="page-title">Find Parking Near You</h1>
        <p className="page-subtitle">
          Discover available parking spots with real-time slot occupancy and instant reservation.
        </p>
        <div style={{ maxWidth: "600px", margin: "1.5rem auto 0" }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by area, garage name or address..."
          />
        </div>
      </div>

      <div className="find-parking-layout">
        {/* Filters Sidebar */}
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          areas={areas}
          onResetFilters={handleResetFilters}
        />

        {/* Results Main Section */}
        <div>
          {/* Sorting Bar */}
          <div className="sort-bar">
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-secondary)" }}>
              Showing <strong style={{ color: "var(--primary)" }}>{filteredParking.length}</strong> parking spots
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowUpDown size={16} color="var(--primary)" />
              <label style={{ fontSize: "0.9rem", fontWeight: "600" }}>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
                style={{ width: "auto", padding: "0.4rem 0.75rem" }}
              >
                <option value="nearest">Nearest</option>
                <option value="cheapest">Cheapest Rate</option>
                <option value="highest_rated">Highest Rated</option>
                <option value="most_available">Most Available</option>
              </select>
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {filteredParking.length > 0 ? (
            <div className="cards-grid">
              {filteredParking.map((parking) => (
                <ParkingCard
                  key={parking.id}
                  parking={parking}
                  isFavorite={favorites.includes(parking.id)}
                  onToggleFavorite={handleToggleFav}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No parking locations found"
              message="No parking spots match your selected search terms or filters. Try adjusting your price range or location."
              actionLabel="Reset All Filters"
              onActionClick={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FindParking;
