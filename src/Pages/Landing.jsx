import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Landing.css";
import {FaCheckCircle, FaSearch, FaBell, FaBolt,FaArrowRight, FaUserGraduate  } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdPendingActions, MdOutlineTrackChanges, MdAdminPanelSettings } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <Navbar />

{/* Hero section */}
      <section className="hero" >
        <div className="hero-left">
          <div className="badge">✨Smart Complaint Management System</div>

          <h1>Manage Campus <br/>Complaints <br /><span>Smarter. </span>Faster.</h1>
          <p>CampusFix helps students report issues, track complaint progress,
            and enables administrators to resolve problems efficiently through
            one centralized platform.</p>

          <div className="hero-buttons">
            <button className="primary-btn" >Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>

{/* Right side */}
        <div className="hero-right">
          <div className="dashboard-preview">
          <div className="dashboard-header">
              <h3>Dashboard</h3>
              <div className="dashboard-actions">
                <div className="search-box">
                  <FaSearch />
                  <span>Search...</span>
                </div>
                <div className="notification"><FaBell /></div>
              </div>
          </div>

            <div className="stats-row">
              <div className="stat-card">
                <HiOutlineDocumentText className="landing-stat-icon landing-total" />
                <h2>24</h2>
                <p>Total</p>
              </div>

              <div className="stat-card">
                <MdPendingActions className="landing-stat-icon landing-pending-icon" />
                <h2>5</h2>
                <p>Pending</p>
              </div>

              <div className="stat-card">
                <BsCheckCircleFill className="landing-stat-icon landing-resolved-icon" />
                <h2>18</h2>
                <p>Resolved</p>
              </div>
            </div>

            <div className="chart-section">
              <div className="chart"></div>
              <div className="chart-info">
                <p><span className="dot pending"></span>Pending</p>
                <p><span className="dot progress"></span>Progress</p>
                <p><span className="dot resolved"></span>Resolved</p>
              </div>
            </div>

            <div className="landing-recent-section">
              <h4>Recent Complaints</h4>
                <div className="landing-item">
                  <span>WiFi Issue</span>
                  <small className="pending-badge">Pending</small>
                </div>

                <div className="landing-item">
                  <span>Water Leakage</span>
                  <small className="resolved-badge">Resolved</small>
                </div>

                <div className="landing-item">
                  <span>Fan Not Working</span>
                  <small className="progress-badge">Progress</small>
                </div>
            </div>
          </div>

        </div>
      </section>

{/* Features section */}
        <section className="features" id="features">
          <div className="section-heading">
            <h2>Why Choose CampusFix?</h2>
            <p> Everything you need to report, track and manage campus complaints with ease.</p>
          </div>

          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineDocumentText />
              </div>
              <h3>Raise Complaint</h3>
              <p>Submit complaints in just a few clicks with complete details.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <MdOutlineTrackChanges />
              </div>
              <h3>Track Status</h3>
              <p>Monitor complaint progress from Pending to Resolved in real time.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaBolt />
              </div>
              <h3>Fast Resolution</h3>
              <p>Enable administrators to resolve issues quickly and efficiently.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>Secure Platform</h3>
              <p>Role-based access ensures a safe and reliable complaint system.</p>
            </div>
          </div>
        </section>


        <section className="how-it-works" id="how-it-works">
            <div className="section-heading">
              <h2>How It Works?</h2>
              <p> Follow these four simple steps to report and resolve campus issues efficiently. </p>
            </div>

            <div className="steps-container">

              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <FaUserGraduate />
                </div>
                <h3>Login / Register</h3>
                <p>Create your account and access your personal dashboard.</p>
              </div>

              <FaArrowRight className="step-arrow" />

              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <HiOutlineDocumentText />
                </div>
                <h3>Raise Complaint</h3>
                <p>Submit your issue with category, location and description.</p>
              </div>

              <FaArrowRight className="step-arrow" />

              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">
                  <MdAdminPanelSettings />
                </div>
                <h3>Admin Reviews</h3>
                <p>The admin reviews, accepts and starts working on your complaint.</p>
              </div>

              <FaArrowRight className="step-arrow" />

              <div className="step-card">
                <div className="step-number">04</div>
                <div className="step-icon">
                  <FaCheckCircle />
                </div>
                <h3>Issue Resolved</h3>
                <p>Track your complaint until it is successfully resolved.</p>
              </div>
            </div>
          </section>

{/* CTA section */}
        <section className="cta-section">
          <div className="cta-card">
            <h2> Ready to Transform Campus Complaints? </h2>
            <p>Join CampusFix today and experience a smarter way to report,track and resolve campus issues with ease.</p>
            <div className="cta-buttons">
              <Link to="/signup"> <button className="primary-btn">Get Started </button> </Link>
              <Link to="/login"><button className="secondary-btn"> Login </button></Link>
            </div>
          </div>
        </section>

        <Footer/>
    </div>
  );
}

export default Landing;