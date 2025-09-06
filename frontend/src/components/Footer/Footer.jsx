import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2c3e50] to-[#4ca1af] text-white px-5 pt-12 pb-5">
    <div className="max-w-[1200px] mx-auto grid grid-cols-3 sm:grid-cols-3 gap-10 text-center sm:text-left">
  {/* About Section */}
  <div className="mt-5">
    <h5 className="font-bold mb-5 text-[#ffd700]">About Us</h5>
    <p className="text-gray-100 text-[0.95rem] mb-5">
      Delicious food delivered to your doorstep. Fast, fresh, and tasty meals every day!
    </p>
  </div>

  {/* Quick Links - Center */}
  <div className="mt-5 text-center">
    <h5 className="font-bold mb-5 text-[#ffd700]">Quick Links</h5>
    <ul className="list-none space-y-2">
      <li><Link to="/menu" className="text-gray-100 text-[0.95rem] hover:text-[#ffcc00] hover:underline">Menu</Link></li>
      <li><Link to="/contact" className="text-gray-100 text-[0.95rem] hover:text-[#ffcc00] hover:underline">Contact</Link></li>
      <li><Link to="/faq" className="text-gray-100 text-[0.95rem] hover:text-[#ffcc00] hover:underline">FAQs</Link></li>
    </ul>
  </div>

  {/* Follow Us - Right */}
  {/* Follow Us - Right Column but Centered Content */}
<div className="mt-5 flex flex-col items-center">
  <h5 className="font-bold mb-5 text-[#ffd700]">Follow Us</h5>
  <div className="flex justify-center gap-4">
    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xl transition-transform transform hover:scale-125 hover:text-[#ffcc00]">
      <i className="fab fa-youtube"></i>
    </a>
  </div>
</div>

</div>


      {/* Footer Bottom */}
      <div className="text-center mt-8 mt-[40px]">
        <p className="text-sm text-gray-300">&copy; 2025 FoodieApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
