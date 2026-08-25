import "./AdminTopbar.css";
import { FaBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminTopbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [unread, setUnread] = useState(0);

  const titles = {
    "/admin-dashboard": "Dashboard",
    "/admin-complaints": "Complaints",
    "/admin-analytics": "Analytics",
    "/admin-complaint-details": "Complaint Details",
  };

  const pageTitle = titles[location.pathname] || "Admin Panel";

  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  useEffect(() => {

    const updateAdmin = () => {
      setAdmin(JSON.parse(localStorage.getItem("loggedInUser")));
    };

    const updateBell = () => {
      const complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

      const pending = complaints.filter(
        (item) => item.status === "Pending"
      ).length;

      setUnread(pending);
    };
    updateBell();

    window.addEventListener("profileUpdated", updateAdmin);
    window.addEventListener("complaintSubmitted", updateBell);

    return () => {
      window.removeEventListener("profileUpdated", updateAdmin);
      window.removeEventListener("complaintSubmitted", updateBell);
    };
  }, []);

  const name = admin?.name || "Admin";
  const email = admin?.email || "admin@campusfix.com";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="admin-topbar">
      <h2 className="admin-page-title">{pageTitle}</h2>
      <div className="admin-top-right">
        <div className="admin-notify" onClick={() => navigate("/admin-complaints")}>
          <FaBell />
          {unread > 0 && <span>{unread}</span>}
        </div>

        <div className="admin-profile">
          <div className="admin-avatar">{initial}</div>

          <div className="admin-info">
            <h4>{name}</h4>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;