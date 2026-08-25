import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"
import StudentLayout from "./Layouts/StudentLayout";
import Dashboard from "./Pages/Student/Dashboard"
import Complaints from "./Pages/Student/Complaints"
import ComplaintDetails from "./Pages/Student/ComplaintDetails"
import Notifications from "./Pages/Student/Notifications"
import Profile from "./Pages/Student/Profile"
import RasieComplaint from "./Pages/Student/RaiseComplaint"
import PrivateRoute from "./routes/PrivateRoute";

import Analytics from "./Pages/Admin/Analytics"
import AComplaints from "./Pages/Admin/AComplaints"
import ADashboard from "./Pages/Admin/ADashboard"
import AComplaintDetails from "./Pages/Admin/AComplaintDetails"
import AdminLayout from "./Layouts/AdminLayout";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>}/>


      <Route element={<PrivateRoute />}>
        <Route element={<StudentLayout />}>
          <Route path="/student-dashboard" element={<Dashboard />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/raise-complaint" element={<RasieComplaint />} />
          <Route path="/complaint-details/:id" element={<ComplaintDetails />} />
        </Route>
      </Route>


      <Route element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<ADashboard />} />
          <Route path="/admin-complaints" element={<AComplaints />} />
          <Route path="/admin-analytics" element={<Analytics />} />
          <Route path="/admin-complaint-details/:id" element={<AComplaintDetails />} />
        </Route>
      </Route>

    </Routes>

    <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    className="campus-toast"
/>
    </>
  );
}

export default App;