import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {Outlet} from 'react-router-dom'

function MainLayout() {
  return (
   <div className="h-screen flex flex-col">
  
  {/* Navbar */}
  <Navbar />

  {/* Below Navbar Section */}
  <div className="flex flex-1 overflow-hidden">
    
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content (Dashboard / Pages) */}
    <div className="flex-1  mt-22 ml-68 mr-2 overflow-auto rounded-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <Outlet />
    </div>

  </div>

</div>
  )
}

export default MainLayout
