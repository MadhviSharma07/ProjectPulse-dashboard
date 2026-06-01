import React from "react";
import { FaRegBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

function Navbar({
  isCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  darkMode,
  setDarkMode,
  handleThemeToggle
}) {


  return (
    <div
      className={`h-16 bg-white dark:bg-gradient-to-r dark:from-[#21013E] dark:via-[#640589] dark:to-[#B61BF4] shadow fixed top-0 right-0 flex items-center 
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
  dark:bg-zinc-900 dark:hover:bg-zinc-700
  "
      >
        <HiMenuAlt3 className="text-2xl dark:text-white text-purple-600 " />
      </button>
      <div className="overflow-hidden">
        <h1 className="text-lg md:text-xl pl-3 font-bold text-gray-800 dark:text-white ">
          Welcome back, Madhvi 👋
        </h1>
      </div>
      <div className="flex items-center gap-1 mr-8 md:gap-4 md:mr-0">
    {/* theme */}
        <button
          onClick={(e) => handleThemeToggle(e)}
          className="relative flex items-center justify-center p-2 rounded-full bg-purple-100 dark:bg-zinc-900 dark:text-white hover:bg-purple-300 dark:hover:bg-zinc-700 transition"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={darkMode ? "dark" : "light"}
              initial={{ rotate: -180, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 180, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
            </motion.div>
          </AnimatePresence>
        </button>

        <span className="text-xl bg-purple-100 dark:bg-zinc-900 dark:text-white p-2 rounded-full">
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
