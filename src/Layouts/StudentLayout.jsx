import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./StudentLayout.css";

const StudentLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;