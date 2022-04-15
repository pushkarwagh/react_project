import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="main_navbar">
    <nav className="navbar shadow navbar-expand-sm  bg-dark mb-2">
      <div className="container text-light m-auto">
        
        <Link 
          to="/" 
          className="text-light navbar-brand" 
          style={{textDecoration:'none'}}
        >
          React_Node
        </Link>
        
        <div>
          <Link 
            to="/register"
            className="text-light m-1"
            style={{textDecoration:'none'}}
          >
            Register
          </Link>
        
          <Link
            to="/login" 
            className="text-light m-1" 
            style={{textDecoration:'none'}}
          >
            Log_IN
          </Link>
        </div>
      
      </div>
    </nav>
    </div>
  );
};

export default Navbar;