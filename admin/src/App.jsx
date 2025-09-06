import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Edit from './pages/Edit/Edit';
import ContactInfo from './pages/contact/contactInfo';
import AdminProfile from './pages/AdminProfile.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
  const url = 'http://localhost:4000';
  const location = useLocation();

  // Pages where we want a "clean" view without Navbar/Sidebar
  const cleanPages = ['/admin/profile'];
  const isCleanPage = cleanPages.includes(location.pathname);

  return (
    <div>
      <ToastContainer />
      
      {!isCleanPage && <Navbar />}
      {!isCleanPage && <hr />}
      
      <div className="app-content">
        {!isCleanPage && <Sidebar />}
 
        <div className="main-outlet">
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/contactinfo" element={<ContactInfo url={url} />} />
          <Route path="/admin/profile" element={<AdminProfile />} /> 
          <Route path="/edit-food/:id" element={<Edit url={url} />} />
        </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
