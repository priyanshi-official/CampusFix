import React from "react";
import "./Profile.css";
import {FaUserCircle, FaCamera, FaUser, FaEnvelope, FaGraduationCap, FaBook, FaSave, FaSignOutAlt,} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if(loggedInUser){
        setName(loggedInUser.name || "");
        setEmail(loggedInUser.email || "");
        setRole(loggedInUser.role==="student" ? "Student" : loggedInUser.role);
        setDepartment(loggedInUser.department || "");
        setSemester(loggedInUser.semester || "");
    }
  },[]);


  const saveProfile = () => {
      if(name.trim()===""){
          toast.error("Name cannot be empty");
          return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = users.map((user) => {
          if(user.email === email){
              return {
                  ...user,
                  name,
                  department,
                  semester
              };
          }
          return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const updatedLoggedInUser = {
          ...loggedInUser,
          name,
          department,
          semester
      };
      localStorage.setItem("loggedInUser",JSON.stringify(updatedLoggedInUser));
      toast.success("Profile Updated Successfully!");
      window.dispatchEvent(new Event("profileUpdated"));
  }

  const updatedLoggedInUser = {
    ...JSON.parse(localStorage.getItem("loggedInUser")),
    name,
    department,
    semester
  };
  localStorage.setItem("loggedInUser",JSON.stringify(updatedLoggedInUser));


  const logout=()=>{
      localStorage.removeItem("loggedInUser");
      navigate("/login");
  }



  return (
    <div className="profile">
      <div className="profile-content">

{/* Left Side */}
          <div className="profile-left">
            <div className="profile-banner-card">
              <h2>My Profile</h2>
              <p>Manage your personal information and account settings.</p>
            </div>

            <div className="profile-photo-card">
              <div className="profile-photo">
                <FaUserCircle />
              </div>

              <button className="upload-btn">
                <FaCamera /> Upload Photo
              </button>

              <p className="profile-file">No file selected</p>
            </div>
          </div>

{/* Right Side */}

          <div className="profile-details">
            <div className="profile-card">
              <h3>Personal Information</h3>

              <div className="profile-grid">
                <div className="profile-field">
                  <label><FaUser /> Full Name</label>
                  <input type="text" placeholder="Enter your name" value={name}
                    onChange={(e)=>setName(e.target.value)} />
                </div>

                <div className="profile-field">
                  <label><FaEnvelope /> Email</label>
                  <input type="email" placeholder="Enter your email" value={email} disabled />
                </div>

                <div className="profile-field full-width">
                  <label><FaGraduationCap /> Role</label>
                  <input type="text" value={role} disabled />
                </div>

              </div>
            </div>


            <div className="profile-card">
              <h3>Academic Information</h3>
              <div className="profile-grid">

                <div className="profile-field">
                  <label><FaBook /> Department</label>
                  <input type="text" placeholder="Computer Science" value={department}
                    onChange={(e)=>setDepartment(e.target.value)} />
                </div>

                <div className="profile-field">
                  <label><FaGraduationCap /> Semester</label>
                  <input type="text" placeholder="4th Semester" value={semester}
                    onChange={(e)=>setSemester(e.target.value)}/>
                </div>
              </div>
            </div>


            <div className="profile-buttons">
              <button className="save-btn" onClick={saveProfile}>
                <FaSave /> Save Changes
              </button>
              <button className="logout-btn" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;