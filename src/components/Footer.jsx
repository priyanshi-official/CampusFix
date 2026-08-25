import React from "react";
import "./Footer.css";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
        </div>

        <div className="footer-links">
          <h3>Resources</h3>
          <a href="#">Student Login</a>
          <a href="#">Admin Login</a>
          <a href="#">Register</a>
        </div>

        <div className="footer-links">
          <h3>Contact</h3>
          <p><FaEnvelope /> campusfix@gmail.com</p>
          <p>📍India</p>

          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 CampusFix. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;