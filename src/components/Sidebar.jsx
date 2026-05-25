import React from "react";
import {
  MdDashboard,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineLogout,
} from "react-icons/md";

import { FaProjectDiagram, FaTasks } from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";

import { SlCalender } from "react-icons/sl";

import { CgNotes } from "react-icons/cg";

import { TbBrandGoogleAnalytics } from "react-icons/tb";

import { Link, useLocation } from "react-router-dom";

import { useLogout } from "../context/LogoutContext.jsx";

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const { setShowLogout } = useLogout();

  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      icon: <MdDashboard />,
      label: "Dashboard",
    },

    {
      path: "/projects",
      icon: <FaProjectDiagram />,
      label: "Projects",
    },

    {
      path: "/tasks",
      icon: <FaTasks />,
      label: "Tasks",
    },

    {
      path: "/calendar",
      icon: <SlCalender />,
      label: "Calendar",
    },

    {
      path: "/analytics",
      icon: <TbBrandGoogleAnalytics />,
      label: "Analytics",
    },

    {
      path: "/notes",
      icon: <CgNotes />,
      label: "Notes",
    },

    {
      path: "/settings",
      icon: <IoMdSettings />,
      label: "Settings",
    },
    {
      action: "logout",
      icon: <MdOutlineLogout />,
      label: "Logout",
    },
  ];

  return (
    <div
      className={`fixed top-1 left-2 h-[95vh] z-50
      ${isCollapsed ? "w-20" : "w-60"}
      bg-[#F8F2FC]
      border border-purple-100
      rounded-[30px]
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      transition-all duration-300
      flex flex-col justify-between
      px-3 py-4`}
    >
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-purple-600 italic">
              ProjectPulse
            </h1>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="
            w-11 h-11
            rounded-2xl
            bg-white
            shadow-md
            hover:bg-purple-500
            hover:text-white
            text-[#4B2991]
            flex items-center justify-center
            transition-all duration-300"
          >
            {isCollapsed ? (
              <MdKeyboardDoubleArrowRight className="text-2xl" />
            ) : (
              <MdKeyboardDoubleArrowLeft className="text-2xl" />
            )}
          </button>
        </div>

        {/* MENU */}

        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const active = location.pathname === item.path;

            // LOGOUT BUTTON
            if (item.action === "logout") {
              return (
                <button
                  key={index}
                  onClick={() => setShowLogout(true)}
                  className={`
          relative flex items-center
          ${isCollapsed ? "justify-center" : "gap-4"}

          px-3 py-3
          rounded-2xl

          text-zinc-500
          hover:text-white

          hover:bg-gradient-to-b
          hover:from-purple-600
          hover:to-purple-500

          hover:shadow-lg

          transition-all duration-300
          overflow-hidden
          w-full
          `}
                >
                  <MdOutlineLogout className="text-2xl" />

                  {!isCollapsed && <span className="font-medium">Logout</span>}
                </button>
              );
            }

            // NORMAL LINKS
            return (
              <Link
                key={index}
                to={item.path}
                className={`
        relative flex items-center
        ${isCollapsed ? "justify-center" : "gap-4"}

        px-3 py-3
        rounded-2xl

        transition-all duration-300
        overflow-hidden

        ${
          active
            ? "bg-gradient-to-b from-purple-600 to-purple-500 text-white shadow-lg"
            : "text-zinc-500 hover:bg-white hover:shadow-md"
        }
        `}
              >
                <span className="text-2xl">{item.icon}</span>

                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
