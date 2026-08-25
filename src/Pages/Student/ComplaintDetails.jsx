import React, { useEffect, useState } from "react"
import "./ComplaintDetails.css"
import { Link, useParams } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa"

const ComplaintDetails = () => {
    const { id } = useParams()
    const [complaint, setComplaint] = useState(null)

    useEffect(() => {
        const allComplaints = JSON.parse( localStorage.getItem("complaints") || "[]" )

        const selectedComplaint = allComplaints.find((item) => item.id === Number(id))

        setComplaint(selectedComplaint)
      }, [id])

    if (!complaint) {
        return <h2>Complaint Not Found</h2>
    }

return (
  <div className="complaint-details">

        <div className="details-path">
          <Link to="/student-dashboard">Dashboard</Link>
          <FaChevronRight />
          <Link to="/complaints">My Complaints</Link>
          <FaChevronRight />
          <span>Complaint Details</span>
        </div>

        <div className="details-card">

          <div className="details-header">
            <h2>Complaint Details</h2>

            {complaint.status === "Pending" ? (<span className="complaintpending">Pending</span>) 
            : complaint.status === "Resolved" ? (<span className="complaintresolved">Resolved</span>)
            : (<span className="complaintprogress">In Progress</span>)
            }
          </div>

          <div className="details-grid">

            <div className="detail-item">
              <label>Title</label>
              <p>{complaint.title}</p>
            </div>

            <div className="detail-item">
              <label>Category</label>
              <p>{complaint.category}</p>
            </div>

            <div className="detail-item">
              <label>Location</label>
              <p>{complaint.location}</p>
            </div>

            <div className="detail-item">
              <label>Priority</label>
              <p>{complaint.priority}</p>
            </div>

            <div className="detail-item">
              <label>Submitted On</label>
              <p>{new Date(complaint.submissionDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="details-card">
          <h3>Description</h3>
          <p className="description-text">{complaint.description}</p>
        </div>

        <div className="details-card">
          <h3>Uploaded Image</h3>
         {complaint.image ? ( <p>{complaint.image}</p>) : (<p>No image uploaded.</p>)}
        </div>

        <div className="details-card">
          <h3>Admin Remarks</h3>
          <p className="admin-remark">{complaint.adminRemark || "No remarks from admin yet."}</p>
        </div>

        <Link to="/complaints" >
          <button className="back-btn">Back to My Complaints</button>
        </Link>

      </div>
    );
};

export default ComplaintDetails;