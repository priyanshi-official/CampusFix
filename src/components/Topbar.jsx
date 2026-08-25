import "./Topbar.css";
import { FaBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Topbar = () => {
  const [unread, setUnread] = useState("")
  const [user,setUser]=useState(JSON.parse(localStorage.getItem("loggedInUser")));
  const location = useLocation();
  const navigate = useNavigate();

  const updateUnread = () => {
    const notifications =JSON.parse(localStorage.getItem("notifications")) || [];
    const count = notifications.filter((item) =>item.studentEmail === user?.email &&item.read === false).length;
    setUnread(count);
  };

  const titles = {
    "/student-dashboard": "Dashboard",
    "/complaints": "My Complaints",
    "/raise-complaint": "Raise Complaint",
    "/notifications": "Notifications",
    "/profile": "Profile",
  };
  const pageTitle = titles[location.pathname] || "CampusFix";

  
  useEffect(() => {
    const updateUser = () => {
        setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    };
    updateUnread();
    window.addEventListener("profileUpdated", updateUser);
    window.addEventListener("notificationUpdated", updateUnread);
    return () => {
        window.removeEventListener("profileUpdated", updateUser);
        window.removeEventListener("notificationUpdated", updateUnread);
    };
  }, [user]);

  const name=user?.name || "Student";
  const email=user?.email || "student@gmail.com";
  const initial=name.charAt(0).toUpperCase();

  
  return (
    <div className="topbar-section">

      <h2 className="page-title">{pageTitle}</h2>
      <div className="top-right">

        <div className="top-notify" onClick={() => navigate("/notifications")} >
          <FaBell /> <span> {unread} </span>
        </div>

        <div className="top-profile" onClick={() => navigate("/profile")} >
          <div className="top-avatar"> {initial} </div>
          <div className="user-info">
            <h4>{name}</h4>
            <p>{email}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Topbar;
