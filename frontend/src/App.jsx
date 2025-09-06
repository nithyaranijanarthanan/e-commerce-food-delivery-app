import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import AboutUs from './pages/AboutUs/AboutUs'
import Contact from './pages/Contact/Contact'
import Faqs from './pages/Faqs'
import Cart from './pages/Cart/Cart'
import Menu from './pages/Menu/Menu'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import Search from "./pages/Search"
import CategoryDetail from './pages/CategoryDetail/CategoryDetail.jsx'
import FoodDetail from './pages/FoodDetail/FoodDetail.jsx'
import Sidebar from './components/Sidebar/Sidebar'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [category, setCategory] = useState("All")  // ✅ keep track of category
  const location = useLocation()

  const isCategoryPage = location.pathname.startsWith("/category")

  return (
    <>
      {showLogin && <LoginPopup  setShowLogin={setShowLogin} />}
      
      <div className="app min-h-screen flex flex-col">
        <Navbar setShowLogin={setShowLogin} />

        <div className="flex flex-1">
          {/* Sidebar only on category pages */}
          {isCategoryPage && (
            <aside className="w-40 md:w-48 border-r bg-gray-50 p-2">
              <Sidebar category={category} setCategory={setCategory} /> 
              {/* ✅ pass props */}
            </aside>
          )}

          {/* Main content */}
          <main className="flex-1 p-4 max-w-6xl mx-auto">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/faq' element={<Faqs />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/search" element={<Search />} />
              <Route path='/order' element={<PlaceOrder/>}/>
              <Route path='/verify' element={<Verify/>}/>
              <Route path='/myorders' element={<MyOrders/>}/>

              <Route 
                path='/category/:categoryName' 
                element={<CategoryDetail category={category} />} 
              />
              <Route path="/food/:id" element={<FoodDetail />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
