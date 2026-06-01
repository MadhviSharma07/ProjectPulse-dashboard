import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//theme state
 const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
    const handleThemeToggle = (e) => {
  const x = e.clientX;
  const y = e.clientY;

  document.documentElement.style.setProperty("--x", `${x}px`);
  document.documentElement.style.setProperty("--y", `${y}px`);

  if (!document.startViewTransition) {
    setDarkMode(!darkMode);
    return;
  }

  document.startViewTransition(() => {
    setDarkMode(!darkMode);
  });
};

  return (
    <div className="h-screen flex flex-col bg-zinc-200 dark:bg-gray-900 transiton-colors duration-300">
      {/* Navbar */}

      <Navbar
        isCollapsed={isCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        handleThemeToggle={handleThemeToggle}
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
  overflow-auto
  rounded-xl
  overflow-y-auto

  [scrollbar-width:none]
  [-ms-overflow-style:none]
  [&::-webkit-scrollbar]:hidden

  transition-all duration-300
  mr-2
  ml-2

  ${isCollapsed ? "md:ml-24" : "md:ml-64"}
  `}
        >
          <Outlet context={{ darkMode, setDarkMode, handleThemeToggle }} />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
