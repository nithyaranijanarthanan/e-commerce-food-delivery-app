import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from './../../assets/assets';

const admin = {
  name: "Admin Name",
  email: "admin@example.com",
  profileImage: assets.profile_image,
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Navigate to the profile page
    navigate('/admin/profile', { state: { admin } });
  };

  return (
    <div className="flex justify-between items-center px-[4%] py-1">
      <img 
        className="w-[max(10%,90px)] rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer" 
        src={assets.logo} 
        alt="Logo" 
      />
      
      <h1
        className="text-2xl text-gray-800 font-outfit m-0 cursor-pointer
                   hover:text-tomato hover:scale-105 transition duration-300
                   active:text-red-600 focus:outline-none focus:ring-2 focus:ring-tomato"
      >
        Admin Panel
      </h1>

      <img 
        src={admin.profileImage} 
        alt="Profile" 
        onClick={handleProfileClick}
        className="w-[max(5%,80px)] rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer" 
      />
    </div>
  );
}

export default Navbar;
