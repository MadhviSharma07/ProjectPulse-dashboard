import React from "react";
import { FaRegBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";

function Navbar({ isCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <div
      className={`h-16 bg-white shadow fixed top-0 right-0 flex items-center 
      justify-between px-3 md:px-6 rounded-2xl m-2 transition-all duration-300 left-0
      ${isCollapsed ? "md:left-22" : "md:left-62"}`}
    >
      {/* Search Bar */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="
  md:hidden
  w-11 h-11
  rounded-xl
  bg-white
  shadow-md
  flex items-center justify-center
  "
      >
        <HiMenuAlt3 className="text-2xl text-purple-600" />
      </button>
      <div>
        <h1 className="text-lg md:text-xl pl-3 font-bold text-gray-800">
          Welcome back, Madhvi 👋
        </h1>
      </div>
      <div className="flex items-center gap-1 mr-8 md:gap-4 md:mr-0">
        {/* theme */}
        <div className="text-xl bg-purple-100 p-2 rounded-full">
          <MdDarkMode />
        </div>

        <span className="text-xl bg-purple-100 p-2 rounded-full">
          <FaRegBell />
        </span>
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}

export default Navbar;
