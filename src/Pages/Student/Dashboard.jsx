import "./Dashboard.css"
import { FaRegSmileBeam, FaClipboardList , FaClock, FaSpinner,FaCheckCircle, FaInbox  } from "react-icons/fa"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])

  const user = JSON.parse(localStorage.getItem("loggedInUser"))

  useEffect(() => {
      const loadComplaints = () => {
          const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
          const allComplaints = JSON.parse(localStorage.getItem("complaints")) || []

          const studentComplaints = allComplaints.filter(
              item => item.studentEmail === loggedInUser.email
          )
          setComplaints(studentComplaints)
      }

      loadComplaints()

      window.addEventListener("complaintUpdated",loadComplaints )

      return () => {
          window.removeEventListener("complaintUpdated",loadComplaints )
      }
  }, [])


  const total = complaints.length
  const pending = complaints.filter(item => item.status === "Pending").length
  const progress = complaints.filter(item => item.status === "In Progress").length
  const resolved = complaints.filter(item => item.status === "Resolved").length


  const totalComplaints = complaints.length
  const pendingPercent = totalComplaints === 0 ? 0 : (pending / totalComplaints) * 100
  const progressPercent = totalComplaints === 0 ? 0 : (progress / totalComplaints) * 100
  const resolvedPercent = totalComplaints === 0 ? 0 : (resolved / totalComplaints) * 100
          

  const recentComplaints = [...complaints].sort((a, b) =>
          new Date(b.submissionDate) - new Date(a.submissionDate)
  ).slice(0, 5)


  return (
    <div className="dash">

      <div className="banner">
        <div className="ban-left">

          <div className="ban-icon">
            <FaRegSmileBeam />
          </div>

          <div className="ban-text">
            <h2>Welcome Back, {user?.name || "Student"}! </h2>
            <p> Manage your complaints, track their progress and stay updated with every status change - all in one place. </p>
          </div>
        </div>
      </div>

{/* Cards */}
      <div className="stats">
        <div className="stat">
          <div className="stat-icon total"><FaClipboardList /></div>
          <div>
            <h2>{total}</h2>
            <p>Total Complaints</p>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon pending"><FaClock /></div>
          <div>
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon progress"><FaSpinner /></div>
          <div>
            <h2>{progress}</h2>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat">
          <div className="stat-icon resolved"><FaCheckCircle /></div>
          <div>
            <h2>{resolved}</h2>
            <p>Resolved</p>
          </div>
        </div>
      </div>


      <div className="bottom-sec">
        <div className="status-box">
          <h3>Complaint Status</h3>
          <div className="status-content">
            <div className="pie"
                  style={{
                      background: `conic-gradient(#F4B400 0% ${pendingPercent}%,
                          #5B8DEF ${pendingPercent}% ${pendingPercent + progressPercent}%,
                          #2ECC71 ${pendingPercent + progressPercent}% 100% )`
                  }}>
                  <div className="pie-center">
                      <h3>{totalComplaints}</h3>
                      <p>Total</p>
                  </div>
              </div>

            <div className="legend">
              <div><span className="dot dot-pending"></span>Pending</div>
              <div><span className="dot dot-progress"></span>In Progress</div>
              <div><span className="dot dot-resolved"></span>Resolved</div>
            </div>

          </div>
        </div>


        <div className="recent-box">
          <div className="recent-head">
            <h3>Recent Complaints</h3>
            <span className="view-all" onClick={() => navigate("/complaints")}>View All </span>
          </div>

          {
            recentComplaints.length === 0 ?
            (
            <div className="recent-empty">
                <div className="empty-icon"><FaInbox /></div>
                <h4>No Complaints Yet</h4>
                <p>Your recently submitted complaints will appear here.</p>
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
                <span className={ item.status === "Pending" ? "pending-badge" : item.status === "Resolved" ? "resolved-badge" : "progress-badge"}>
                    {item.status}
                </span>
            </div>
            ))
            }
            </div>
            )
            }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;