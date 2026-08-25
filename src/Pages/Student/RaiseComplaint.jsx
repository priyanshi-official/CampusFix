import React from "react"
import "./RaiseComplaint.css"
import { Link } from "react-router-dom"
import {FaChevronRight, FaClipboard, FaFolder, FaMapMarkerAlt, FaFlag, FaAlignLeft, FaCloudUploadAlt,FaLightbulb, } from "react-icons/fa"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRef } from "react"

const RaiseComplaint = () => {
  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [category, setCategory] = useState("")
  const [categoryError, setCategoryError] = useState("")
  const [location, setLocation] = useState("")
  const [locationError, setLocationError] = useState("")
  const [priority, setPriority] = useState("")
  const [priorityError, setPriorityError] = useState("")
  const [description, setDescription] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);

  const reset = () =>{
    setTitle("")
    setCategory("")
    setLocation("")
    setPriority("")
    setDescription("")
    setImage(null)
    setTitleError("")
    setCategoryError("")
    setLocationError("")
    setPriorityError("")
    setDescriptionError("")
    setImageName("")

    if(fileInputRef.current){
      fileInputRef.current.value = ""
    }
  }

  const submitComplaint = (e) =>{
    e.preventDefault()
    let valid = true
    
    if(title.trim() === ""){
        setTitleError("Enter complaint title")
        valid = false
    }

    if(category === ""){
        setCategoryError("Select a category")
        valid = false
    }

    if(location.trim() === ""){
        setLocationError("Enter location")
        valid = false
    }

    if(priority === ""){
        setPriorityError("Select priority")
        valid = false
    }

    if(description.trim() === ""){
        setDescriptionError("Enter description")
        valid = false
    }

    if(!valid)
      return

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
    const complaint={
      id:Date.now(),
      title,
      category,
      location,
      priority,
      description,
      image:imageName,
      status:"Pending",
      studentName: loggedInUser.name,
      submissionDate: new Date(),
      studentEmail:loggedInUser.email,
    }

    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]")
    window.dispatchEvent(new Event("complaintUpdated"))

    complaints.push(complaint)

    const notifications = JSON.parse(localStorage.getItem("notifications")) || []
    notifications.unshift({
        id: Date.now(),
        studentEmail: loggedInUser.email,
        complaintId: complaint.id,
        type: "submitted",
        message: `Your complaint "${title}" has been submitted successfully.`,
        time: new Date().toLocaleString(),
        read: false,
    });
    localStorage.setItem("notifications", JSON.stringify(notifications))
    window.dispatchEvent(new Event("notificationUpdated"))

    localStorage.setItem("complaints", JSON.stringify(complaints))

     toast.success("Complaint Submitted Successfully!")
     reset()
  }


  return (
    <div className="raise">

      <div className="raisecomplaint-path">
        <Link to="/student-dashboard">Dashboard</Link>
        <FaChevronRight /><span>Raise Complaint</span>
      </div>


      <div className="raise-content">
{/* Left */}

        <div className="raise-card">
          <h3>Complaint Details</h3>

          <form onSubmit={submitComplaint}>
            <div className="form-row">
              <div className="field">
                <label><FaClipboard />Complaint Title</label>
                <input type="text" placeholder="Enter complaint title" value={title} onChange={(e)=>{
                  setTitle(e.target.value)
                  setTitleError("")
                }}/>
                <p className="complainterror">{titleError}</p>
              </div>
              

              <div className="field">
                <label><FaFolder /> Category</label>
                <select  value={category} onChange={(e)=>{
                  setCategory(e.target.value)
                  setCategoryError("")
                  }}>
                  <option vlaue="">Select Category</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Internet / WiFi">Internet</option>
                  <option value="Cleanliness">Cleanliness</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Classroom Equipment">Classroom</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Canteen">Canteen</option>
                  <option value="Security">Security</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Sports Equipment">Sports Equipment</option>
                  <option value="Parking">Parking</option>
                  <option value="Network/IT">Network/IT</option>
                  <option value="Other">Other</option>

                </select>
                <p className="complainterror">{categoryError}</p>
              </div>
              
            </div>


            <div className="form-row">
              <div className="field">
                <label> <FaMapMarkerAlt /> Location </label>
                <input type="text" placeholder="Enter location" value={location} onChange={(e)=>{
                  setLocation(e.target.value)
                  setLocationError("")
                }}/>
                <p className="complainterror">{locationError}</p>
              </div>
              

              <div className="field">
                <label><FaFlag /> Priority </label>
                <select value={priority} onChange={(e)=>{
                  setPriority(e.target.value)
                  setPriorityError("")
                  }}>
                  <option value="">Select priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <p className="complainterror">{priorityError}</p>
              </div>
              
            </div>


            <div className="field">
              <label> <FaAlignLeft />Description </label>
              <textarea rows="6" placeholder="Describe your issue..." value={description} onChange={(e)=>{
                setDescription(e.target.value)
                setDescriptionError("")
              }}></textarea>
              <p className="complainterror">{descriptionError}</p>
            </div>
            

            <div className="field">
              <label>Upload Image</label>
              <div className="upload-box">
                <FaCloudUploadAlt /> <p>{imageName || "Click to upload image"}</p>
                <small>PNG, JPG or JPEG</small>
                <input  ref={fileInputRef} type="file" accept="image/*"
                 onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file)
                     return;
                  setImageName(file.name);
                }}/>
              </div>
            </div>

            <div className="btns">
              <button type="button" className="reset-btn" onClick={reset}>Reset</button>
              <button type="submit" className="submit-btn">Submit Complaint</button>
            </div>
          </form>
        </div>

{/* Right */}
        <div className="tips-card">
          <h3><FaLightbulb />Quick Tips</h3>
          <ul>
            <li>Mention the exact location.</li>
            <li>Explain the issue clearly.</li>
            <li>Upload an image if possible.</li>
            <li>Select the correct category.</li>
            <li>Choose the appropriate priority.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RaiseComplaint;
