import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {Outlet} from 'react-router-dom'
import { useState } from 'react'

function MainLayout() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
   <div className="h-screen flex flex-col">
  
  {/* Navbar */}
  
  <Navbar isCollapsed={isCollapsed} />

  {/* Below Navbar Section */}
  <div className="flex flex-1 overflow-hidden">
    
    {/* Sidebar */}
    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

    {/* Main Content (Dashboard / Pages) */}
<div
  className={`flex-1 mt-22 mr-2 overflow-auto rounded-xl overflow-y-auto 
  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
  transition-all duration-300
  ${isCollapsed ? "ml-24" : "ml-64"}`}
>
  <Outlet />
</div>

  </div>

</div>
  )
}

export default MainLayout
