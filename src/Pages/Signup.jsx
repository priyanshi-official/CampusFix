import React, { useState } from "react"
import "./Signup.css"
import { Link , useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import logo from "../assets/icons/logo.png"
import {FaEnvelope,FaLock,FaUserGraduate,FaUserShield, FaUser} from "react-icons/fa"


const Signup = () => {
  const [role, setRole] = useState("student")
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigate()
  let valid=true

  const Submit = (e) => {
    e.preventDefault()
    let valid = true

    if (name.trim() === "") {
      setNameError("Enter your name")
      valid = false
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
      setEmailError("Enter valid email address")
      valid = false
    }

    if (password === "" || password.length < 8) {
      setPasswordError("Password must be at least 8 characters.")
      valid = false
    }

    if (!valid)
       return;

    const users = JSON.parse(localStorage.getItem("users")) || []
    const adminExists = users.some((user) => user.role === "admin")

    const alreadyExists = users.find((user) => user.email === email)

    if (alreadyExists) {
      setEmailError("Email already registered.")
      return
    }

    if (role === "admin" && adminExists) {
      alert("Admin account already exists.")
      return
    }

    const user = {
      name,
      email,
      password,
      role,
    };

    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("loggedInUser", JSON.stringify(user))

    setName("")
    setEmail("")
    setPassword("")
    setRole("student")

    if (role === "student") {
      navigate("/student-dashboard")
    } else {
      navigate("/admin-dashboard")
    }
  };

  return (
    <div>
      <Navbar />

      <div className="signup-page">
        <form className="signup-card" onSubmit={Submit}>
          <img src={logo} alt="CampusFix" className="login-logo" />
          <h2>Campus<span>Fix</span></h2>
          <p className="signup-text">Signup to CampusFix</p>

          <div className="input-box">
            <FaUser className="input-icon"/>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{
              setName(e.target.value)
              setNameError("")
            }} />
          </div>
          <p className="error">{nameError}</p>

          <div className="input-box">
            <FaEnvelope className="input-icon"/>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
              setEmailError("")
            }}/>
          </div>
            <p className="error">{emailError}</p>

          <div className="input-box">
            <FaLock className="input-icon"/>
            <input  type="password"  placeholder="Enter your password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
              setPasswordError("")
            }}/>
          </div>
          <p className="error">{passwordError}</p>

          {/* Role */}

          <div className="role">
            <p>Signup As</p>
            <div className="role-btns">
              {/* <button type="button" className={role === "student" ? "active" : ""}  onClick={() => setRole("student")} >
                <FaUserGraduate /> Student
              </button> */}
              {/* <button type="button" className={role === "admin" ? "active" : ""}  onClick={() => setRole("admin")} >
                <FaUserShield /> Admin
              </button> */}
            </div>
          </div>

          <button className="signup-btn2" > Sign up </button>
          <p className="login-link"> Already have an account? <Link to="/login"> Login</Link> </p>
        </form>
      </div>

    </div>
  );
};

export default Signup;