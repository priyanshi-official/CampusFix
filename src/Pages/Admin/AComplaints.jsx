import React, { useEffect, useState } from "react"
import "./AComplaints.css"
import { Link } from "react-router-dom"
import {FaChevronRight,FaSearch,FaEye} from "react-icons/fa"

const AComplaints = () => {
  const [complaints, setComplaints] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    const allComplaints =JSON.parse(localStorage.getItem("complaints")) || []
    setComplaints(allComplaints)
  }, [])

  const filteredComplaints = complaints.filter((complaint) => {

    const matchesSearch =complaint.title.toLowerCase().includes(search.toLowerCase()) ||
      complaint.studentName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =statusFilter === "All" || complaint.status === statusFilter

    return matchesSearch && matchesStatus
  });

  return (
    <div className="admin-complaints">

      <div className="admin-path">
        <Link to="/admin-dashboard">Dashboard</Link>
        <FaChevronRight />
        <span>Complaints</span>
      </div>

      <div className="admin-complaints-card">
        <div className="admin-header">
          <h2>All Complaints</h2>

          <div className="admin-total">
            Total Complaints :<span>{complaints.length}</span>
          </div>

          <div className="admin-filters">
            <div className="admin-search-box">
              <FaSearch />
              <input type="text" placeholder="Search complaint..."value={search} onChange={(e) =>setSearch(e.target.value) }/>
            </div>

            <select value={statusFilter} onChange={(e) =>
                setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

          </div>
        </div>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Student</th>
                <th>Complaint</th>
                <th>Category</th>
                <th>Status</th>
                <th>Submitted On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredComplaints.length === 0 ?
                  <tr>
                    <td colSpan="7" className="admin-no-data">
                      No Complaints Found
                    </td>
                  </tr>
                  :
                  filteredComplaints.map((complaint, index) => (
                    <tr key={complaint.id}>
                      <td>{index + 1}</td>
                      <td>{complaint.studentName}</td>
                      <td>{complaint.title}</td>
                      <td>{complaint.category}</td>
                      <td>
                        {
                          complaint.status === "Pending" ?
                            <span className="complaintpending-badge"> Pending</span>
                            :
                            complaint.status === "Resolved" ?
                              <span className="complaintresolved-badge"> Resolved </span>
                              :
                              <span className="complaintprogress-badge">In Progress </span>
                        }
                      </td>
                      <td>
                        {
                          new Date(
                            complaint.submissionDate
                          ).toLocaleDateString()
                        }
                      </td>
                      <td>
                        <Link to={`/admin-complaint-details/${complaint.id}`}>
                          <button className="action-btn"><FaEye /></button>
                        </Link>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AComplaints;