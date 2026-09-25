import React from "react";

const Button = ({
  children,
  variant = "primary", // primary, secondary, outline, danger
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
  style = {}
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
