import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ text = "Loading parking data...", size = 32 }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", gap: "1rem" }}>
      <Loader2 size={size} color="var(--primary)" style={{ animation: "spin 1s linear infinite" }} />
      <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontWeight: "500" }}>{text}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
