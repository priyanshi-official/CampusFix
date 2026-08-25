import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;