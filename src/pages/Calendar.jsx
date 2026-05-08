import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import useTasks from "../context/TaskContext";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTask, setNewTask] = useState("");

  // 🔹 Task State (date-based)
  const { tasks, addTask, toggleTaskStatus } = useTasks();

  const normalizeDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  // 🔹 Helpers
  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const isToday = (y, m, d) => {
    const t = new Date();
    return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
  };

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDay = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // 🔹 Navigation
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );

  // 🔹 Add Task
  const addTaskHandler = () => {
    if (!newTask.trim() || !selectedDate) return;

    addTask({
      title: newTask,
      dueDate: selectedDate,
      priority: "medium",
    });

    setNewTask("");
  };
  // 🔹 Priority Color
  const getDotColor = (task) => {
    if (task.status === "completed") return "bg-green-500";
    if (task.priority === "high") return "bg-red-500";
    if (task.priority === "medium") return "bg-yellow-400";
    return "bg-blue-400";
  };
  const createdTasksByDate = {};
  const dueTasksByDate = {};
  const completedTasksByDate = {};

  tasks.forEach((task) => {
    // 🔹 Created Tasks
    if (task.createdAt) {
      const createdKey = normalizeDate(task.createdAt);

      if (!createdTasksByDate[createdKey]) {
        createdTasksByDate[createdKey] = [];
      }

      createdTasksByDate[createdKey].push(task);
    }

    // 🔹 Due Tasks
    if (task.dueDate) {
      const dueKey = normalizeDate(task.dueDate);

      if (!dueTasksByDate[dueKey]) {
        dueTasksByDate[dueKey] = [];
      }

      dueTasksByDate[dueKey].push(task);
    }

    // 🔹 Completed Tasks
    if (task.completedAt) {
      const completedKey = normalizeDate(task.completedAt);

      if (!completedTasksByDate[completedKey]) {
        completedTasksByDate[completedKey] = [];
      }

      completedTasksByDate[completedKey].push(task);
    }
  });
  // 🔹 Calendar Grid
  const renderDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentDate);
    const firstDay = getFirstDay(currentDate);

    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={"empty" + i}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const key = formatDate(y, m, d);
      const createdTasks = createdTasksByDate[key] || [];
      const dueTasks = dueTasksByDate[key] || [];
      const completedTasks = completedTasksByDate[key] || [];
      days.push(
        <div
          key={d}
          onClick={() => setSelectedDate(key)}
          className="h-24 bg-white rounded-xl p-2 shadow-md hover:bg-purple-50 hover:shadow-xl cursor-pointer transition"
        >
          {/* Date */}
          <div
            className={`text-sm font-medium mb-1 ${
              isToday(y, m, d)
                ? "bg-purple-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                : "text-gray-700"
            }`}
          >
            {d}
          </div>

          {/* Dots */}
          <div className="flex gap-1 flex-wrap mt-1">
            {/* Created */}
            {createdTasks.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}

            {/* Due */}
            {dueTasks.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            )}

            {/* Completed */}
            {completedTasks.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
          </div>
        </div>,
      );
    }

    return days;
  };

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Calendar</h1>

        <p className="text-md font-medium text-purple-600 bg-purple-100 px-4 py-1 rounded-full">
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="p-2 bg-white rounded-lg shadow"
          >
            <MdChevronLeft />
          </button>

          <h2 className="text-lg font-medium">{monthYear}</h2>

          <button
            onClick={nextMonth}
            className="p-2 bg-white rounded-lg shadow"
          >
            <MdChevronRight />
          </button>

          {/* Today Button */}
        </div>
      </div>

      {/* 🧩 Layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* 📅 Calendar */}
        <div className="col-span-3">
          <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3">{renderDays()}</div>
        </div>

        {/* 📌 Sidebar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm sticky top-6 h-fit">
          <div className="mb-5 border-b pb-4">

            <h2 className="text-xl font-bold text-gray-800">
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Select a date"}
            </h2>

            {selectedDate && (
              <p className="text-sm text-purple-500 mt-1">
                {(dueTasksByDate[selectedDate] || []).length} tasks scheduled
              </p>
            )}
          </div>
          {/* Tasks */}
         <div className="space-y-5">

  {/* Created Tasks */}
  <div>
    <div className="flex items-center gap-2 mb-2">
      <span className="w-2 h-2 rounded-full bg-blue-500"></span>

      <h3 className="text-sm font-medium text-gray-600">
        Created
      </h3>
    </div>

    <div className="space-y-2">
      {(createdTasksByDate[selectedDate] || []).map((task) => (
        <div
          key={task.id}
          className="bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-700"
        >
          {task.title}
        </div>
      ))}
    </div>
  </div>

  {/* Due Tasks */}
  <div>
    <div className="flex items-center gap-2 mb-2">
      <span className="w-2 h-2 rounded-full bg-purple-400"></span>

      <h3 className="text-sm font-medium text-gray-600">
        Scheduled
      </h3>
    </div>

    <div className="space-y-2">
      {(dueTasksByDate[selectedDate] || []).map((task) => (
        <div
          key={task.id}
          className="bg-purple-50 rounded-xl px-3 py-2 text-sm text-gray-700"
        >
          {task.title}
        </div>
      ))}
    </div>
  </div>

  {/* Completed Tasks */}
  <div>
    <div className="flex items-center gap-2 mb-2">
      <span className="w-2 h-2 rounded-full bg-green-400"></span>

      <h3 className="text-sm font-medium text-gray-600">
        Completed
      </h3>
    </div>

    <div className="space-y-2">
      {(completedTasksByDate[selectedDate] || []).map((task) => (
        <div
          key={task.id}
          className="bg-green-50 rounded-xl px-3 py-2 text-sm text-gray-400 line-through"
        >
          {task.title}
        </div>
      ))}
    </div>
  </div>

</div>
          {/* Add Task */}
          {selectedDate && (
            <div className="flex gap-2">
              <div className="mt-6 border-t pt-4">
  <p className="text-sm font-medium text-gray-700 mb-3">
    Schedule a Task
  </p>

  <input
    value={newTask}
    onChange={(e) => setNewTask(e.target.value)}
    placeholder="What needs to be done?"
    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
  />

  <button
    onClick={addTaskHandler}
    className="w-full mt-3 bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-xl transition"
  >
    Schedule Task
  </button>
</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
