import React from "react"
import "./Complaints.css"
import { Link } from "react-router-dom"
import { FaChevronRight, FaSearch, FaEye } from "react-icons/fa"
import { useState, useEffect } from "react"


const Complaints = () => {
  const [complaints, setComplaints] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(()=>{
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))

    const allComplaints = JSON.parse(localStorage.getItem("complaints") || "[]")
    const studentComplaints = allComplaints.filter(
      (complaint)=>complaint.studentEmail === loggedInUser.email
    )
    setComplaints(studentComplaints)
  },[])

  const filteredComplaints = complaints.filter((complaint) => {
        const matchesSearch = complaint.title.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === "All" || complaint.status === statusFilter
        return matchesSearch && matchesStatus
  })



  return (
    <div className="complaints">

      <div className="complaints-path">
        <Link to="/student-dashboard">Dashboard</Link>
        <FaChevronRight /><span>My Complaints</span>
      </div>


      <div className="complaints-card">
        <div className="complaints-header">
          <h2>My Complaints</h2>
            <div className="complaints-total">
              Total Complaints : <span>{complaints.length}</span>
            </div>

          <div className="filters">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search complaint..." value={search} onChange={(e)=>{
                setSearch(e.target.value)
              }}/>
            </div>

            <select value={statusFilter}
                    onChange={(e)=>setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>


        <div className="complaints-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
                  {
                  filteredComplaints.length===0 ?
                  <tr>
                  <td colSpan="5" className="no-data">No Complaints Found</td>
                  </tr>
                  :
                  filteredComplaints.map((complaint)=>(
                  <tr key={complaint.id}>
                      <td>{complaint.title}</td>
                      <td>{complaint.category}</td>

                      <td>
                          {complaint.status==="Pending" ? <span className="complaintpending-badge"> Pending </span> :
                            complaint.status==="Resolved" ? <span className="complaintresolved-badge">Resolved</span> :
                              <span className="complaintprogress-badge">In Progress</span>
                          }
                      </td>
                      <td>{new Date(complaint.submissionDate).toLocaleDateString()}</td>
                      <td><Link to={`/complaint-details/${complaint.id}`}>
                            <button className="action-btn"><FaEye /></button></Link>
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

export default Complaints;