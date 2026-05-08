import React, { useState } from "react";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "preferences", label: "Preferences" },
    { id: "data", label: "Data" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2FC] to-[#EDE9FE] p-6">

      {/* 🔝 Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">

        {/* 🔹 Sidebar */}
        <div className="w-1/4 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition ${
                activeTab === tab.id
                  ? "bg-purple-500 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🔹 Content */}
        <div className="flex-1 space-y-6">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-xl font-semibold mb-6">Profile</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center text-xl font-bold text-purple-700">
                  M
                </div>
                <button className="text-sm text-purple-500">
                  Change Photo
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="w-full mt-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button className="mt-6 bg-purple-500 text-white px-6 py-2 rounded-xl shadow hover:bg-purple-600">
                Save Changes
              </button>
            </div>
          )}

          {/* PREFERENCES */}
          {activeTab === "preferences" && (
            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-xl font-semibold mb-6">Preferences</h2>

              {/* Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span>Dark Mode</span>
                <div
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                    darkMode ? "bg-purple-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                      darkMode ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Show Completed Tasks</span>
                <div
                  onClick={() => setShowCompleted(!showCompleted)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                    showCompleted ? "bg-purple-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                      showCompleted ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* DATA */}
          {activeTab === "data" && (
            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-xl font-semibold mb-6">Data Management</h2>

              <div className="flex gap-4">
                <button className="bg-gray-200 px-5 py-2 rounded-xl hover:bg-gray-300">
                  Export Data
                </button>

                <button className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600">
                  Clear All Data
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Settings;