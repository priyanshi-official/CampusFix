import React from "react";
import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBullseye, FaEye, FaClipboardList, FaClock, FaBolt, FaShieldAlt } from "react-icons/fa";
import aboutImg from "../assets/images/about.png";

const About = () => {
  return (
    <div>
      <Navbar />

      <div className="about">
        <section className="ab-hero">
          <div className="ab-left">
            <h1>About Campus<span>Fix</span></h1>
            <p>CampusFix is a modern complaint management platform that helps
              students report campus issues effortlessly while enabling
              administrators to manage and resolve them efficiently.</p>
          </div>

          <div className="ab-right">
            <img src={aboutImg} alt="About"/>
          </div>
        </section>

        <section className="why">
          <h2>Why We Built CampusFix?</h2>
          <div className="why-card">
            <p>Managing campus complaints manually often leads to delays,
              confusion and poor communication.</p>
            <p>CampusFix digitizes the complete complaint process so students
              can easily raise issues while administrators can efficiently
              review, track and resolve them through a centralized platform.</p>
          </div>
        </section>

        <section className="mv">
          <div className="mv-card">
            <FaBullseye className="mv-icon"/>
            <h3>Our Mission</h3>
            <p>To provide a simple, transparent and efficient complaint
              management system that improves campus communication.</p>
          </div>

          <div className="mv-card">
            <FaEye className="mv-icon"/>
            <h3>Our Vision</h3>
            <p>To build smarter campuses where every complaint is tracked,
              managed and resolved with complete transparency.</p>
          </div>
        </section>


        <section className="ab-feat"  id="features">
          <h2>Key Features</h2>
          <div className="features-container">

            <div className="feature-card">
              <FaClipboardList className="feature-icon"/>
              <h3>Raise Complaint</h3>
              <p>Submit complaints quickly with complete details.</p>
            </div>
            <div className="feature-card">
              <FaClock className="feature-icon"/>
              <h3>Track Status</h3>
              <p>Monitor every complaint from Pending to Resolved.</p>
            </div>
            <div className="feature-card">

              <FaBolt className="feature-icon"/>
              <h3>Quick Resolution</h3>
              <p>Speed up issue handling through organized workflows. </p>
            </div>
            <div className="feature-card">
              <FaShieldAlt className="feature-icon"/>
              <h3>Secure Access</h3>
              <p>Role-based authentication for students and admins.</p>
            </div>
          </div>
        </section>

      <Footer />
      </div>
    </div>
  );
};

export default About;