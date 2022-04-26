import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="p-4 bg-light text-center">
      <h3>
        Please,{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#008080" }}>
          Log_In!!!!
        </Link>
      </h3>
    </div>
  );
}

export default NotFound;
