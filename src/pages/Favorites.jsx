import React, { useState, useEffect } from "react";
import ParkingCard from "../components/ParkingCard";
import EmptyState from "../components/EmptyState";
import { getParkingLocations, getFavorites, toggleFavorite } from "../utils/localStorage";
import { Bookmark, Heart } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [parkingList, setParkingList] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
    setParkingList(getParkingLocations());
  }, []);

  const handleToggleFav = (id) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const savedLocations = parkingList.filter(loc => favorites.includes(loc.id));

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div className="page-header">
        <h1 className="page-title">Favorite Parking Spots</h1>
        <p className="page-subtitle">Your saved parking garages and locations for 1-click booking access.</p>
      </div>

      {savedLocations.length > 0 ? (
        <div className="cards-grid">
          {savedLocations.map((loc) => (
            <ParkingCard
              key={loc.id}
              parking={loc}
              isFavorite={true}
              onToggleFavorite={handleToggleFav}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No Favorite Locations Saved"
          message="Click the heart icon on any parking card to save it here for quick access."
          actionLabel="Explore Parking Locations"
          actionLink="/find-parking"
        />
      )}
    </div>
  );
};

export default Favorites;
