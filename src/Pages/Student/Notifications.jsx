import React from "react";
import "./Notifications.css";import { useEffect } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle, FaBell } from "react-icons/fa";
import { FaInbox } from "react-icons/fa";

const Notifications = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const notifications = (
      JSON.parse(localStorage.getItem("notifications")) || []
  ).filter(
      (item) => item.studentEmail === loggedInUser.email
  );

  useEffect(() => {
      const allNotifications =JSON.parse(localStorage.getItem("notifications")) || [];

      const updatedNotifications = allNotifications.map((item) => {
          if (item.studentEmail === loggedInUser.email) {
              return { ...item, read: true };
          }
          return item;
      });
      localStorage.setItem("notifications",JSON.stringify(updatedNotifications) );
      window.dispatchEvent(new Event("notificationUpdated"));
  }, []);

  return (
    <div className="notifications">

      <div className="notify-head">
        <div>
          <p>Stay updated with your complaint status.</p>
        </div>

        <div className="notify-icon">
          <FaBell />
        </div>
      </div>

      <div className="notify-card">
       {
        notifications.length === 0 ?

        <div className="empty-notifications">
            <FaInbox />
            <h3>No Notifications Yet</h3>
            <p>You'll receive updates about your complaints here.</p>
        </div>
        :
        notifications.map((item)=>(
            <div className={`notify-item ${item.type}`} key={item.id}>
                <div className="notify-left">
                    <div className="notify-status">
                        {item.type==="submitted" && <FaBell />}
                        {item.type==="accepted" && <FaCheckCircle />}
                        {item.type==="progress" && <FaClock />}
                        {item.type==="resolved" && <FaCheckCircle />}
                        {item.type==="rejected" && <FaTimesCircle />}
                    </div>

                    <div className="notify-content">
                        <p>{item.message}</p>
                        <span>{item.time}</span>
                    </div>
                </div>
            </div>
        ))
    }
      </div>
    </div>
  );
};

export default Notifications;