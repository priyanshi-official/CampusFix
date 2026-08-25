import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo-section">
        <img src={logo} alt="CampusFix Logo" />
        <h2>Campus<span>Fix</span></h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <Link to="/about">About</Link>
      </div>

      <div className="nav-btns">
        <Link to="/login"><button className="login-btn">Login</button></Link>
        <Link to="/signup"><button className="signup-btn">Sign Up</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;