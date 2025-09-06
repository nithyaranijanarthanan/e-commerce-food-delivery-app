import React, { useContext, useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  const { getTotalCartAmount, token, setToken, user } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setProfileOpen(false);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setMenu('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu('home')}>
        <img src={assets.logo} alt='Logo' className='logo' />
      </Link>

      {/* Hamburger icon (mobile only) */}
      <div 
        className="hamburger" 
        onClick={() => setMobileMenuOpen(prev => !prev)}
      >
        ☰
      </div>

      {/* Menu */}
      <ul className={`navbar-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to='/' onClick={() => { setMenu('home'); setMobileMenuOpen(false); }} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <Link to='/menu' onClick={() => { setMenu('menu'); setMobileMenuOpen(false); }} className={menu === 'menu' ? 'active' : ''}>Menu</Link>
        <li className={menu === "about us" ? "active" : ""}>
          <Link to="/about" onClick={() => { setMenu('about us'); setMobileMenuOpen(false); }}>About us</Link>
        </li>
        <li className={menu === "contact" ? "active" : ""}>
          <Link to="/contact" onClick={() => { setMenu('contact'); setMobileMenuOpen(false); }}>Contact us</Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className='navbar-right'>
        <div className='navbar-search'>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <img
            src={assets.search_icon}
            alt='Search'
            onClick={handleSearch}
            className='search-icon-clickable'
          />
        </div>

        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='Cart' />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>

        {!token ? (
          <button className='mr-[80px]' onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile' ref={profileRef}>
            <img
              src={assets.profile_icon}
              alt='Profile'
              onClick={() => setProfileOpen(prev => !prev)}
            />
            {user && user.name && (
              <p className="navbar-username">{user.name}</p>
            )}
            {profileOpen && (
              <ul className='nav-profile-dropdown'>
                <li onClick={() => { navigate('/myorders'); setProfileOpen(false); }}>
                  <img src={assets.bag_icon} alt='Orders' />
                  <p className='mt-[12px]'>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt='Logout' />
                  <p className='mt-[12px]'>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
