import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import AdminTopbar from '../components/AdminTopbar'
import "./AdminLayout.css"

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar/>
      <div className="admin-content">
        <AdminTopbar/>
      <div className="admin-main">
        <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default AdminLayout
