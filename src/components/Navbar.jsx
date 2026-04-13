import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";


function Navbar() {
  return (
    <div className="h-16 bg-white shadow fixed top-0 left-64 right-0 flex items-center justify-between px-6 rounded-2xl m-2">
    
        {/* Search Bar */}
      <div className="flex items-center bg-gray-100 px-2 w-100 py-2 rounded-lg w-1/3">        
      <IoSearchOutline className='text-xl' />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full"
        />
      </div>
     
      <div className="flex items-center gap-4"> 
      {/* theme */}
      <div className='text-xl bg-purple-100 p-2 rounded-full'>
        <MdDarkMode />
      </div>

        <span className='text-xl bg-purple-100 p-2 rounded-full'><FaRegBell /></span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  )
}

export default Navbar
 