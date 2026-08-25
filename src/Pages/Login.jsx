import React, { useState } from "react"
import "./Login.css"
import { Link ,useNavigate} from "react-router-dom"
import Navbar from "../components/Navbar"
import logo from "../assets/icons/logo.png"
import {FaEnvelope,FaLock} from "react-icons/fa"


const Login = () => {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigate()

  const SubmitLogin = (e)=>{
    e.preventDefault()
    let valid=true

    if(email === "" || !email.includes("@") || !email.includes(".")){
      setEmailError("Enter valid email address")
      valid=false
    }
    if(password === "" || password.length < 8){
      setPasswordError("Enter correct password.")
      valid=false
    }

    if(!valid)
      return

  const users = JSON.parse(localStorage.getItem("users") || [])

   const user = users.find((e) => {
    return (
      e.email.toLowerCase() === email.toLowerCase() && e.password === password 
    )
  })

  if (!user) {
    setPasswordError("Invalid email or password.")
    return
  }
    localStorage.setItem("loggedInUser", JSON.stringify(user))

    setEmail("")
    setPassword("")

    if(user.role==="student"){
      navigate("/student-dashboard")
    }
    else{
      navigate("/admin-dashboard")
    }
  }

  return (
    <div>
      <Navbar />

      <div className="login-page">
        <form className="login-card" onSubmit={SubmitLogin}>

          <img src={logo} alt="CampusFix" className="login-logo" />
          <h2>Campus<span>Fix</span></h2>
          <p className="login-text">Log in to continue to CampusFix</p>

          <div className="input-box">
            <FaEnvelope className="input-icon"/>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{
                setEmail(e.target.value)
                setEmailError("")
            }} />
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


          <div className="forgot">
            <a href="/">Forgot Password?</a>
          </div>

          <button className="login-btn2"> Login </button>

          <p className="signup-link"> Don't have an account? <Link to="/signup"> Sign Up</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;