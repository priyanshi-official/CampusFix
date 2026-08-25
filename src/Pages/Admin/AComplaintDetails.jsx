import React, { useEffect, useState } from "react"
import "./AComplaintDetails.css"
import { Link, useParams } from "react-router-dom"
import { FaChevronLeft, FaPaperclip } from "react-icons/fa"
import { toast } from "react-toastify"

const AComplaintDetails = () => {
    const { id } = useParams()
    const [complaint, setComplaint] = useState(null)
    const [status, setStatus] = useState("")
    const [remark, setRemark] = useState("")

    useEffect(() => {
        const complaints =JSON.parse(localStorage.getItem("complaints")) || []
        const selectedComplaint = complaints.find(
            (item) => item.id === Number(id)
        )
        if (selectedComplaint) {
            setComplaint(selectedComplaint)
            setStatus(selectedComplaint.status)
            setRemark(selectedComplaint.adminRemark || "")
        }
    }, [id])
    if (!complaint) {
        return <h2>Complaint Not Found</h2>
    }


    const updateComplaint = () => {
      const oldStatus = complaint.status
      const oldRemark = complaint.adminRemark || ""
      const complaints =JSON.parse(localStorage.getItem("complaints")) || []

      const updatedComplaints = complaints.map((item) => {
          if (item.id === complaint.id) {
              return {
                  ...item,
                  status,
                  adminRemark: remark,
              }
          }
          return item;
      });
      localStorage.setItem("complaints",JSON.stringify(updatedComplaints))

      setComplaint({
          ...complaint,
          status,
          adminRemark: remark,
      });
      window.dispatchEvent(new Event("complaintUpdated"))

      
    if (oldStatus !== status || oldRemark !== remark) {

        const notifications =JSON.parse(localStorage.getItem("notifications")) || []
        let message = ""
        if (oldStatus !== status) {
            message = `Your complaint "${complaint.title}" has been updated to "${status}".`
        } else {
            message = `Admin added remarks on your complaint "${complaint.title}".`
        }

       let notificationType = ""
        if(status === "Pending"){
            notificationType = "accepted"
        }
        else if(status === "In Progress"){
            notificationType = "progress"
        }
        else if(status === "Resolved"){
            notificationType = "resolved"
        }
        notifications.unshift({
            id: Date.now(),
            studentEmail: complaint.studentEmail,
            complaintId: complaint.id,
            type: notificationType,
            message: `Your complaint "${complaint.title}" has been updated to "${status}".`,
            time: new Date().toLocaleString(),
            read:false
        })
        localStorage.setItem("notifications",JSON.stringify(notifications))
        window.dispatchEvent(new Event("notificationUpdated"))
    }

      toast.success("Complaint updated successfully!")
  };



    return (
        <div className="admin-details">
            <div className="details-path">
                <Link to="/admin-complaints"> <FaChevronLeft /> Back to Complaints </Link>
            </div>

            <div className="details-wrapper">
{/* Left */}
                <div className="details-left">
                    <h2>Complaint Information</h2>
                    <div className="detail-row">
                        <span>Title</span>
                        <p>{complaint.title}</p>
                    </div>

                    <div className="detail-row">
                        <span>Student</span>
                        <p>{complaint.studentName}</p>
                    </div>

                    <div className="detail-row">
                        <span>Category</span>
                        <p>{complaint.category}</p>
                    </div>

                    <div className="detail-row">
                        <span>Location</span>
                        <p>{complaint.location}</p>
                    </div>

                    <div className="detail-row">
                        <span>Priority</span>
                        <p>{complaint.priority}</p>
                    </div>

                    <div className="detail-row">
                        <span>Date Raised</span>
                        <p>{new Date(
                                complaint.submissionDate
                            ).toLocaleString()}
                        </p>
                    </div>

                    <div className="description">
                        <span>Description</span>
                        <p>{complaint.description}</p>
                    </div>

                    <div className="attachment">
                        <span>Attachment</span>
                        {
                            complaint.image ?
                                <div className="file-box">
                                    <FaPaperclip />{complaint.image}
                                </div>
                                :
                                <p>No file attached</p>
                        }
                    </div>
                </div>

{/* Right */}
                <div className="details-right">
                    <h2>Update Complaint</h2>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value) }>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                    </select>

                    <label>Remarks</label>
                    <textarea rows="8" placeholder="Write remarks..." value={remark} onChange={(e) =>  setRemark(e.target.value) }/>
                    <button className="update-btn" onClick={updateComplaint}>Update</button>
                </div>

            </div>
        </div>
    );
};

export default AComplaintDetails;