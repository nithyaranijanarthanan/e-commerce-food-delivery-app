import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminProfile.css';

const AdminProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin } = location.state || {};

  if (!admin) {
    return (
      <div className="admin-profile-container">
        <div className="admin-profile-card">
          <p className="admin-profile-info">No admin data found!</p>
          <button
            className="admin-profile-button"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-card">
        <img 
          src={admin.profileImage} 
          alt={admin.name} 
          className="admin-profile-image"
        />
        {/* <h2 className="admin-profile-name">{admin.name}</h2> */}
        <p className="admin-profile-info"><strong>Email:</strong> {admin.email}</p>
        <p className="admin-profile-info"><strong>Role:</strong> {admin.role || 'Admin'}</p>
        <p className="admin-profile-info"><strong>Phone:</strong> {admin.phone || '9876543210'}</p>
        <p className="admin-profile-info"><strong>Address:</strong> {admin.address || 'xyz'}</p>
        <p className="admin-profile-info"><strong>Joined:</strong> {admin.joinedDate || 'Jan 1 2020'}</p>
        
        <button
          className="admin-profile-button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
