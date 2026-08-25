import "./Analytics.css"
import { Link } from "react-router-dom"
import { FaChevronRight } from "react-icons/fa"
import { useEffect, useState } from "react"
import {BarChart,Bar,XAxis,YAxis, Tooltip,ResponsiveContainer,CartesianGrid,} from "recharts"
import { LineChart,Line,} from "recharts"

const Analytics = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const loadComplaints = () => {
        const allComplaints =JSON.parse(localStorage.getItem("complaints")) || []
        setComplaints(allComplaints)
    };
    loadComplaints();
    window.addEventListener("complaintUpdated", loadComplaints)
    return () =>
        window.removeEventListener("complaintUpdated",loadComplaints)
  }, []);
  

  const total = complaints.length;
  const pending = complaints.filter(item => item.status === "Pending").length
  const progress = complaints.filter(item => item.status === "In Progress").length
  const resolved = complaints.filter(item => item.status === "Resolved").length

  const categoryMap = {}
  complaints.forEach((item) => {
      if (categoryMap[item.category]) {
          categoryMap[item.category]++
      } else {
          categoryMap[item.category] = 1
      }
  });
  const categoryData = Object.keys(categoryMap).map((key) => ({
      category: key,
      count: categoryMap[key],
  }));


  const monthMap = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  complaints.forEach((item) => {
    const month = new Date(item.submissionDate).toLocaleString("default", {
      month: "short",
    });
    monthMap[month]++
  });

  const monthlyData = Object.keys(monthMap).map((month) => ({
    month,
    complaints: monthMap[month],
  }));



  return (
    <div className="analytics">

      <div className="analytics-path">
        <Link to="/admin-dashboard">Dashboard</Link>
        <FaChevronRight /><span>Analytics</span>
      </div>

      <div className="analytics-head">
        <p>View complaint trends and category-wise statistics.</p>
      </div>

      <div className="analytics-cards">
        <div className="analytics-card">
          <h3>{total}</h3>
          <p>Total Complaints</p>
        </div>

        <div className="analytics-card">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div className="analytics-card">
          <h3>{progress}</h3>
          <p>In Progress</p>
        </div>

        <div className="analytics-card">
          <h3>{resolved}</h3>
          <p>Resolved</p>
        </div>
      </div>


      <div className="chart-card">
        <h2>Complaints by Category</h2>

        <div className="chart-placeholder">
          <div style={{ width: "90%", height: 250 }}>
            <ResponsiveContainer>
            <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false}/>
            <Tooltip cursor={{ fill: "rgba(200,146,46,.08)" }} />
            <Bar dataKey="count" fill="#C8922E" radius={[8,8,0,0]} barSize={40}/>
            </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="chart-card">
        <h2>Monthly Complaints</h2>
        <div className="chart-placeholder">
          <div style={{ width: "90%", height: 250 }}>
              <ResponsiveContainer>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{ stroke: "#C8922E", strokeWidth: 1 }}/>
                  <Line type="monotone" dataKey="complaints" stroke="#C8922E" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Analytics;