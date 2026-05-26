import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}

      <Navbar
        isCollapsed={isCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Below Navbar Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="
    fixed inset-0
    bg-black/20
    backdrop-blur-sm
    z-40
    md:hidden
    "
          />
        )}

        {/* Main Content (Dashboard / Pages) */}
        <div
          className={`
  flex-1
  mt-22
  mr-2
  overflow-auto
  rounded-xl
  overflow-y-auto

  [scrollbar-width:none]
  [-ms-overflow-style:none]
  [&::-webkit-scrollbar]:hidden

  transition-all duration-300

  ml-0

  ${isCollapsed ? "md:ml-24" : "md:ml-64"}
  `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
