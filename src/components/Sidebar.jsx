import React from "react";
import { useState } from "react";
import { FaHome, FaProjectDiagram, FaTasks } from "react-icons/fa";
import {
  MdDashboard,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineLogout,
} from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useLogout } from "../context/LogoutContext.jsx";

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { setShowLogout } = useLogout();

  return (
    <div
      className={`${
        isCollapsed ? "w-22" : "w-60"
      } h-screen bg-[#F8F2FC] fixed left-0 top-0 p-4 rounded-r-2xl transition-all duration-300`}
    >
      <div className=" ">
        <div className="px-8 py-2 rounded-xl bg-white flex items-center gap-5">
          {!isCollapsed && (
            <h1 className="italic text-xl font-bold text-black">
              ProjectPulse
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center text-zinc-600 hover:text-purple-600 transition"
          >
            {isCollapsed ? (
              <MdKeyboardDoubleArrowRight className="text-2xl " />
            ) : (
              <MdKeyboardDoubleArrowLeft className="text-2xl " />
            )}
          </button>
        </div>
      </div>
      <div className="mt-8 mb-5 flex flex-col gap-15">
        <ul className="text-lg space-y-2 text-black">
          <Link
            to="/"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <MdDashboard className="text-xl" />

            {!isCollapsed && "Dashboard"}
          </Link>
          <Link
            to="/projects"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <FaProjectDiagram className="text-xl " />
            {!isCollapsed && "Projects"}
          </Link>
          <Link
            to="/tasks"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <FaTasks className="text-xl " />
            {!isCollapsed && "Tasks"}
          </Link>
          <Link
            to="/calendar"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <SlCalender className="text-xl " />
            {!isCollapsed && "Calendar"}
          </Link>
          <Link
            to="/analytics"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <TbBrandGoogleAnalytics className="text-xl " />
            {!isCollapsed && "Analytics"}
          </Link>
          <Link
            to="/notes"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <CgNotes className="text-xl " />
            {!isCollapsed && "Notes"}
          </Link>
        </ul>
        <ul className="text-lg space-y-2 text-black">
          <Link
            to="/settings"
            className="cursor-pointer hover:bg-purple-200 px-2 py-2 rounded-lg flex items-center gap-2"
          >
            <IoMdSettings className="text-xl" />
            {!isCollapsed && "Settings"}
          </Link>

          <button
            onClick={() => setShowLogout(true)}
            className="text-red-500 space-y-2 flex items-center gap-2 px-2 py-2"
          >
            <MdOutlineLogout className="text-xl" />
            {!isCollapsed && "Logout"}
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
