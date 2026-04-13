import React from 'react'
import { FaHome, FaProjectDiagram, FaTasks } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { Link } from 'react-router-dom';


function Sidebar() {
  return (
      <div className="w-64 h-148 bg-[#F8F2FC] text-white fixed left-0 top-0 p-4 rounded-r-2xl mt-2 ">
      <div className='px-3 py-2 rounded-xl bg-white'>
        <h1 className=" italic text-xl font-bold text-black">ProjectPulse</h1>
      </div>
      <div className='mt-8 mb-5 flex flex-col gap-20'>
          <ul className="text-lg space-y-2 text-black">
            <Link to="/" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><MdDashboard className='text-lg' />Dashboard</Link>
            <Link to="/projects" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><FaProjectDiagram className='text-lg' />Projects</Link>
            <Link to="/tasks" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><FaTasks className='text-lg' />Tasks</Link>
            <Link to="/calendar" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><SlCalender className='text-lg' />Calendar</Link>
            <Link to="/analytics" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><SlCalender className='text-lg' />Analytics</Link>
            <Link to="/notes" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><CgNotes className='text-lg' />Notes</Link>
           
          </ul> 
          <ul className="text-lg space-y-2 text-black">
            <Link to="/settings" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><IoMdSettings />Settings</Link>
            <Link to="/logout" className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"><IoLogOut />Log Out</Link>
          </ul>
      </div>
    </div>
  )
}

export default Sidebar
