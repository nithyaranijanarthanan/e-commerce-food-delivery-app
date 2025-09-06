import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
const handleLogout = () => {
  // Clear admin session
  localStorage.removeItem('adminToken');

  // Full-page redirect to user app on port 5173
  // Add query param to force login popup
  window.location.href = "http://localhost:5173/?fromAdmin=true";
};




  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink 
          to='/add' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink 
          to='/list' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink 
          to='/orders' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

        <NavLink 
          to='/contactinfo' 
          className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}
        >
          <img src={assets.order_icon} alt="" />
          <p>User Message</p>
        </NavLink>

        {/* Logout */}
        <button onClick={handleLogout} className="sidebar-option logout-btn">
          <FiLogOut size={20} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar;
