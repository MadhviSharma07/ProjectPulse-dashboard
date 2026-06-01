import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Moon,
  Sun,
  Bell,
  Trash2,
  Download,
  Upload,
  User,
  Palette,
  Shield,
  Check,
} from "lucide-react";
import useTasks from "../context/TaskContext";

function Settings( ) {
  const { tasks } = useTasks();
  const   {darkMode, setDarkMode, handleThemeToggle} =useOutletContext();

  // 🔹 Notifications
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("notifications") !== "false";
  });

  // 🔹 Username
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Madhvi";
  });

  // 🔹 Profile Photo
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "";
  });


  // 🔹 Autosave
  const [autosave, setAutosave] = useState(() => {
    return localStorage.getItem("autosave") !== "false";
  });

  const [showImageMenu, setShowImageMenu] = useState(false);

const removeProfileImage = () => {
  setProfileImage("");
  localStorage.removeItem("profileImage");
  setShowImageMenu(false);
};

  // 🔹 Save Settings
  useEffect(() => {
    localStorage.setItem("notifications", notifications);
    localStorage.setItem("username", username);
    localStorage.setItem("profileImage", profileImage);
    localStorage.setItem("autosave", autosave);
  }, [
    notifications,
    username,
    autosave,
    profileImage,
  ]);

  // 🔹 Upload Profile Image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // 🔹 Export Tasks
  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);

    const blob = new Blob([dataStr], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "tasks-backup.json";
    link.click();
  };

  // 🔹 Clear All Tasks
  const clearAllTasks = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
      localStorage.removeItem("tasks");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6 dark:bg-zinc-700/50">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Settings
          </h1>

          <p className="text-gray-500 mt-1 text-sm dark:text-gray-400">
            Customize your productivity workspace
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-sm text-gray-400 dark:text-gray-400 dark:bg-zinc-900 dark:hover:bg-zinc-700 transition">
          {tasks.length} tasks stored
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-3xl p-6 shadow-sm dark:bg-zinc-800/60 border border-transparent  dark:border-purple-400/40
    hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-purple-100 rounded-2xl">
                <User className="text-purple-500" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Profile
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-400">
                  Personalize your dashboard experience
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <img
                  src={
                    profileImage ||
                    "https://ui-avatars.com/api/?background=8B5CF6&color=fff&name=" +
                      username
                  }
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-100 shadow-md dark:border-purple-400/40 shadow-sm  transition"
                />

               <div className="absolute bottom-1 right-1">
  <button
    onClick={() => setShowImageMenu(!showImageMenu)}
    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full transition"
  >
    <Upload size={16} />
  </button>

  {showImageMenu && (
    <div className="absolute left-0 bottom-12 w-40 bg-white dark:bg-zinc-600 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-500 overflow-hidden z-50">
      
      <label className="block px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700">
        Choose Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            handleImageUpload(e);
            setShowImageMenu(false);
          }}
        />
      </label>

      {profileImage && (
        <button
          onClick={removeProfileImage}
          className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-700 text-sm"
        >
          Remove Photo
        </button>
      )}
    </div>
  )}
</div>
              </div>

              <p className="text-sm text-gray-400 mt-3">
                Upload profile photo
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500 block mb-2 dark:text-gray-400">
                Display Name
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-3xl p-6 shadow-sm dark:bg-zinc-800/60 border border-transparent  dark:border-purple-400/40
    hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-pink-100 rounded-2xl">
                <Palette className="text-pink-500" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800  dark:text-white ">
                  Appearance
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Customize theme
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 ">
                  Switch between light and dark UI
                </p>
              </div>

              <button
                onClick={(e) => handleThemeToggle(e)}
                className={`w-14 h-8 rounded-full flex items-center px-1 transition ${
                  darkMode ? "bg-purple-500 justify-end" : "bg-gray-300"
                }`}
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  {darkMode ? (
                    <Moon size={14} className="text-purple-500" />
                  ) : (
                    <Sun size={14} className="text-yellow-500" />
                  )}
                </div>
              </button>
            </div>

          </div>

          {/* Notifications */}
          <div className="bg-white rounded-3xl p-6 shadow-sm   dark:bg-zinc-800/60 border border-transparent  dark:border-purple-400/40
    hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-yellow-100 rounded-2xl">
                <Bell className="text-yellow-500" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800  dark:text-white ">
                  Productivity Preferences
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Control reminders and saving behavior
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Deadline Notifications
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Get reminders for upcoming tasks
                  </p>
                </div>

                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition ${
                    notifications
                      ? "bg-purple-500 justify-end"
                      : "bg-gray-300"
                  }`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              {/* Autosave */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Auto Save
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    Automatically save dashboard changes
                  </p>
                </div>

                <button
                  onClick={() => setAutosave(!autosave)}
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition ${
                    autosave
                      ? "bg-purple-500 justify-end"
                      : "bg-gray-300"
                  }`}
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Backup */}
          <div className="bg-white rounded-3xl p-6 shadow-sm   dark:bg-zinc-800/60 border border-transparent  dark:border-purple-400/40
    hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Shield className="text-blue-500" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800  dark:text-white ">
                  Backup & Data
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Export or manage your task data
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={exportTasks}
                className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-2xl transition"
              >
                <Download size={18} />
                Export Tasks
              </button>

              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl transition dark:bg-zinc-500 dark:text-white dark:hover:bg-zinc-600">
                <Upload size={18} />
                Import Backup
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-red-100  dark:bg-zinc-800/60 dark:border-red-400/40">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-red-100 rounded-2xl">
                <Trash2 className="text-red-500" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800  dark:text-white ">
                  Danger Zone
                </h2>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Permanent actions for your workspace
                </p>
              </div>
            </div>

            <button
              onClick={clearAllTasks}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition"
            >
              Delete All Tasks
            </button>
          </div>

          {/* App Info */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-500  text-white p-6 rounded-2xl shadow  shadow-sm dark:from-[#370850] dark:to-[#6E15AF] border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <h2 className="text-lg font-semibold mb-2">
              Productivity Hub
            </h2>

            <p className="text-sm leading-relaxed text-purple-100">
              Organize projects, track deadlines, manage notes, and visualize your productivity in one place.
            </p>

            <div className="mt-5 flex justify-between text-sm">
              <div>
                <p className="text-purple-200">Version</p>
                <p className="font-medium">1.0.0</p>
              </div>

              <div>
                <p className="text-purple-200">Tasks</p>
                <p className="font-medium">{tasks.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
