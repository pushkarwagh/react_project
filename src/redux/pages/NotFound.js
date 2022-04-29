import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="p-4 bg-light text-center"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
        minHeight: "60vh",
        color: "white",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "#008080" }}>
        Please,{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#008080" }}>
          Log_In!!!!
        </Link>
      </h3>
    </div>
  );
}

export default NotFound;
