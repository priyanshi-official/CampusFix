import React from "react"
import "./ADashboard.css"
import {FaClipboardList,FaClock,FaSpinner,FaCheckCircle,FaBoxOpen} from "react-icons/fa"
import { useEffect, useState } from "react"

const ADashboard = () => {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
      const loadComplaints = () => {
          const allComplaints =JSON.parse(localStorage.getItem("complaints")) || []
          setComplaints(allComplaints);
      }
      loadComplaints()
      window.addEventListener("complaintUpdated",loadComplaints)

      return () => {
          window.removeEventListener("complaintUpdated",loadComplaints)}
  }, [])


  const total = complaints.length;
  const pending = complaints.filter(item => item.status === "Pending").length
  const progress = complaints.filter(item => item.status === "In Progress").length
  const resolved = complaints.filter(item => item.status === "Resolved").length

  const pendingPercent =total === 0 ? 0 : (pending / total) * 100
  const progressPercent =total === 0 ? 0 : (progress / total) * 100
  const resolvedPercent =total === 0 ? 0 : (resolved / total) * 100

  const recentComplaints = [...complaints].sort((a, b) =>
      new Date(b.submissionDate) - new Date(a.submissionDate)
  ).slice(0, 5)


  return (
    <div className="admin-dashboard">

      <div className="admin-banner">
        <div className="admin-banner-icon">👨‍💼</div>
        <div>
          <h2>Welcome Back, Campus Administrator!</h2>
          <p>Manage campus complaints, track their progress and keep students updated from one place.</p>
        </div>
      </div>


      <div className="admin-cards">
        <div className="admin-card">
          <div className="admin-card-icon total"><FaClipboardList /></div>
          <div>
            <h2>{total}</h2>
            <p>Total Complaints</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon pending"><FaClock /></div>
          <div>
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon progress"><FaSpinner /></div>
          <div>
            <h2>{progress}</h2>
            <p>In Progress</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon resolved"><FaCheckCircle /></div>
          <div>
            <h2>{resolved}</h2>
            <p>Resolved</p>
          </div>
        </div>

      </div>


      <div className="admin-bottom-section">

        <div className="admin-chart-card">
          <h2>Complaint Status</h2>
          <div className="chart-content">

            <div className="fake-chart"
                style={{
                    background: `conic-gradient(#F4B400 0% ${pendingPercent}%,
                        #5B8DEF ${pendingPercent}% ${pendingPercent + progressPercent}%,
                        #2ECC71 ${pendingPercent + progressPercent}% 100% )`
                }}>
                <div className="pie-center">
                    <h3>{total}</h3>
                    <p>Total</p>
                </div>
            </div>

            <div className="chart-legend">
              <div><span className="dot yellow"></span>Pending</div>
              <div><span className="dot orange"></span>In Progress</div>
              <div><span className="dot green"></span>Resolved</div>
            </div>
          </div>
        </div>

 
        <div className="recent-card">
          <div className="recent-head">
            <h2>Recent Complaints</h2>
            <span>View All </span>
          </div>

          {
            recentComplaints.length === 0 ?
            (
            <div className="recent-empty">
                <div className="empty-icon"><FaBoxOpen /></div>
                <h3>No Complaints Yet</h3>
                <p>Newly submitted complaints will appear here.</p>
            </div>
            )
            :
            (
            <div className="recent-list">
            {
            recentComplaints.map((item) => (
            <div className="recent-item" key={item.id}>
                <div>
                    <h4>{item.title}</h4>
                    <p>{item.category}</p>
                </div>
                <span
                    className={item.status === "Pending" ? "pending-badge" : item.status === "Resolved" ? "resolved-badge" : "progress-badge"}>
                    {item.status}
                </span>
            </div>
            ))}
            </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default ADashboard;