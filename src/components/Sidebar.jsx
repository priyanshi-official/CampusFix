import "./Sidebar.css";
import logo from "../assets/icons/logo.png";
import {FaHome,FaClipboardList,FaPlusCircle,FaBell,FaUser,FaSignOutAlt} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate=useNavigate();
  const logout=()=>{
      localStorage.removeItem("loggedInUser");
      navigate("/login");
  }

  return (
    <div className="side">

      <div className="side-logo">
        <img src={logo} alt="logo" />
        <h2>Campus<span>Fix</span></h2>
      </div>

      <div className="menu">
        <NavLink to="/student-dashboard" className="item">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/complaints" className="item">
          <FaClipboardList />
          <span>My Complaints</span>
        </NavLink>

        <NavLink to="/raise-complaint" className="item">
          <FaPlusCircle />
          <span>Raise Complaint</span>
        </NavLink>

        <NavLink to="/notifications" className="item">
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/profile" className="item">
          <FaUser />
          <span>Profile</span>
        </NavLink>
      </div>

      <div className="bottom">
        <button className="logout"  onClick={logout}> <FaSignOutAlt />Logout</button>
      </div>

    </div>
  );
};

export default Sidebar;