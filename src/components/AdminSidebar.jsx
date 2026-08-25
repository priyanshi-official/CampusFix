import React from "react";
import "./AdminSidebar.css";
import logo from "../assets/icons/logo.png";
import {FaHome,FaClipboardList,FaSignOutAlt,FaChartBar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate=useNavigate();
  const logout=()=>{
      localStorage.removeItem("loggedInUser");
      navigate("/login");
  }

  return (
    <div className="sidebar">

      <div className="logo">
        <img src={logo} alt="logo" />
        <h2>Campus<span>Fix</span></h2>
      </div>

      <div className="admin-menu">

        <NavLink to="/admin-dashboard" className="items">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-complaints" className="items">
          <FaClipboardList />
          <span>Complaints</span>
        </NavLink>

        <NavLink to="/admin-analytics" className="items">
          <FaChartBar />
          <span>Analytics</span>
        </NavLink>

      </div>

      <div className="admin-bottom">
        <button className="logout"  onClick={logout}> <FaSignOutAlt />Logout</button>
      </div>

    </div>
  );
};

export default AdminSidebar;