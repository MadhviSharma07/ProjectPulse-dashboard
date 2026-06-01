import React from "react";
import {
  MdDashboard,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineLogout,
} from "react-icons/md";

import { useState } from "react";

import { FaProjectDiagram, FaTasks } from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";

import { SlCalender } from "react-icons/sl";

import { CgNotes } from "react-icons/cg";

import { TbBrandGoogleAnalytics } from "react-icons/tb";

import { Link, useLocation } from "react-router-dom";

import { useLogout } from "../context/LogoutContext.jsx";
import { AnimatePresence, motion } from "framer-motion";

function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
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
      className={`fixed top-2 left-2 h-[95vh] z-50
      ${isCollapsed ? "w-20" : "w-60"}
      ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-[120%] md:translate-x-0"
      }
      bg-[#F8F2FC]
      backdrop-blur-xl
      dark:bg-zinc-900/90
      dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      border border-purple-100
      dark:border-zinc-700
      rounded-[30px]
      shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      transition-all duration-300
      flex flex-col justify-between
      px-3 py-4`}
    >
      {/* TOP */}
      <div
        className={`${isCollapsed ? "items-center" : ""} flex flex-col gap-6`}
      >
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
            dark:bg-purple-500 dark:text-white
            shadow-md
            hover:bg-purple-500
            hover:text-white
            text-[#4B2991]
            flex items-center justify-center
            transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isCollapsed ? "right" : "left"}
                initial={{
                  opacity: 0,
                  x: isCollapsed ? -10 : 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: isCollapsed ? 10 : -10,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {isCollapsed ? (
                  <MdKeyboardDoubleArrowRight className="text-2xl" />
                ) : (
                  <MdKeyboardDoubleArrowLeft className="text-2xl" />
                )}
              </motion.div>
            </AnimatePresence>
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
    min-h-[56px]
    rounded-2xl

    transition-all duration-300
    overflow-visible

    text-zinc-500
    dark:text-zinc-400

    hover:bg-white
    dark:hover:bg-zinc-800
    hover:shadow-md
  `}
              >
                {active && (
                  <motion.div
                    layoutId="activeBubble"
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 20,
                    }}
                    className={`
        absolute
         ${
        isCollapsed
          ? "left-1/2 -translate-x-1/2 w-12 h-12 rounded-full"
          : "left-0 right-0 h-full rounded-2xl"
      }

        w-12
        h-12

        rounded-full

        bg-gradient-to-br
        from-purple-600
        via-violet-500
        to-purple-500

        shadow-lg
        shadow-purple-500/40
      `}
                  />
                )}

               <motion.span
  whileHover={{
    scale: 1.1,
  }}
  className={`
    relative z-10
    text-2xl
    ${active ? "text-white" : ""}
  `}
>
  {item.icon}
</motion.span>

                {!isCollapsed && (
                 <span
  className={`
    relative z-10
    font-medium
    transition-colors

    ${
      active
        ? "dark:text-white text-zinc-900"
        : "text-zinc-500 dark:text-zinc-400"
    }
  `}
>
                    {item.label}
                  </span>
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
