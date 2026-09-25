import React from "react";
import { CheckCircle2, AlertCircle, Car } from "lucide-react";
import "../styles/parking.css";

const SlotGrid = ({ slots = [], selectedSlot, onSelectSlot }) => {
  return (
    <div className="slot-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.3rem" }}>Select Parking Slot</h3>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Click an available slot to reserve
        </span>
      </div>

      {/* Legend */}
      <div className="slot-legend">
        <div className="legend-item">
          <div className="legend-color legend-available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-occupied"></div>
          <span>Occupied</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-selected"></div>
          <span>Selected</span>
        </div>
      </div>

      {/* Slot Grid Matrix */}
      <div className="slot-matrix">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.id;
          const isOccupied = slot.status === "occupied";
          const isAvailable = slot.status === "available";

          let className = "slot-btn ";
          if (isOccupied) className += "occupied";
          else if (isSelected) className += "selected";
          else className += "available";

          return (
            <button
              key={slot.id}
              className={className}
              disabled={isOccupied}
              onClick={() => {
                if (isAvailable) {
                  onSelectSlot(slot.id);
                }
              }}
              title={isOccupied ? `Slot ${slot.id} is occupied` : `Select Slot ${slot.id}`}
            >
              <Car size={20} />
              <span className="slot-btn-id">{slot.id}</span>
              <span className="slot-btn-status">
                {isOccupied ? "Occupied" : isSelected ? "Selected" : "Available"}
              </span>
            </button>
          );
        })}
      </div>

      {selectedSlot && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "var(--primary-light)",
            border: "1px solid var(--border-glow)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <CheckCircle2 color="var(--primary)" size={20} />
            <span style={{ fontWeight: "700" }}>Selected Slot: <span style={{ color: "var(--primary)", fontSize: "1.1rem" }}>{selectedSlot}</span></span>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Ready for checkout</span>
        </div>
      )}
    </div>
  );
};

export default SlotGrid;
