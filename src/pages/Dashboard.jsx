import React from "react";
import Button from "../Other components/Button";
import { MdDelete, MdEdit } from "react-icons/md";
import useTasks from "../context/TaskContext";
import { useState } from "react";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editDeadline, setEditDeadline] = useState("");

  const { updateTask, tasks, toggleTaskStatus, deleteTask, addTask } =
    useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const productivity =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // todays task
  const today = new Date().toDateString();

  const todaysTasks = tasks.filter(
    (t) => new Date(t.createdAt).toDateString() === today,
  );
  const todayCompleted = todaysTasks.filter(
    (t) => t.status === "completed",
  ).length;

  // productive day
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const completedPerDay = days.map((day, index) => {
    const count = tasks.filter((task) => {
      if (!task.completedAt) return false;
      return new Date(task.completedAt).getDay() === index;
    }).length;

    return { day, count };
  });

  const mostProductiveDay = completedPerDay.sort(
    (a, b) => b.count - a.count,
  )[0];

  // completion rate
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // message logic
  let message = "";

  if (completionRate > 80) {
    message = "You're on fire 🔥";
  } else if (completionRate > 50) {
    message = "Great progress 💪";
  } else {
    message = "Let’s get more done 🚀";
  }

  // handle edit click
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  // form
  useEffect(() => {
    if (selectedTask) {
      setEditTitle(selectedTask.title);
      setEditPriority(selectedTask.priority || "medium");
      setEditDeadline(
        selectedTask.dueDate ? selectedTask.dueDate.split("T")[0] : "",
      );
    }
  }, [selectedTask]);

  // handle update
  const handleUpdate = () => {
    updateTask({
      ...selectedTask,
      title: editTitle,
      priority: editPriority,
      dueDate: editDeadline, //
    });

    setShowEditModal(false);
    setSelectedTask(null); //
  };
  //add task handler
  const handleAddTask = () => {
    if (!title.trim()) return;
    addTask({ title, project: project.trim(), priority, dueDate });
    setTitle("");
    setProject("");
    setPriority("medium");
    setShowModal(false);
  };
  //recent task
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  //projects
  const uniqueProjects = [
    ...new Set(
      tasks
        .map((t) => t.project?.trim().toLowerCase()) // 🔥 normalize
        .filter(Boolean),
    ),
  ];

  const totalProjects = uniqueProjects.length;
  // dueDate
  const [dueDate, setDueDate] = useState("");
  // upcoming deadline
  const todayDate = new Date();

  const upcomingTasks = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      ...task,
      due: new Date(task.dueDate),
    }))
    .filter((task) => task.due >= todayDate)
    .sort((a, b) => a.due - b.due)
    .slice(0, 5);

  const getDeadlineLabel = (date) => {
    const today = new Date();
    const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return `${diff} days`;
  };

  //weekly productive data

  const weeklyData = days.map((day, index) => {
    const count = tasks.filter((task) => {
      if (!task.completedAt) return false;

      const taskDay = new Date(task.completedAt).getDay();
      return taskDay === index;
    }).length;

    return { day, tasks: count };
  });

  // projects
  const projectMap = {};

  tasks.forEach((task) => {
    const projectName = task.project?.trim().toLowerCase();
    if (!projectName) return;

    if (!projectMap[projectName]) {
      projectMap[projectName] = {
        total: 0,
        completed: 0,
      };
    }

    projectMap[projectName].total++;

    if (task.status === "completed") {
      projectMap[projectName].completed++;
    }
  });

  const projectData = Object.keys(projectMap).map((name) => {
    const { total, completed } = projectMap[name];

    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      name,
      progress,
    };
  });
  
  const completedProjects = Object.values(projectMap).filter(
  (proj) => proj.total > 0 && proj.total === proj.completed
).length;

const pendingProjects = totalProjects - completedProjects;

 const Cards = [
    { title: "Projects", value: totalProjects },
    { title: "Completed", value: completedProjects },
    { title: "Pending", value: pendingProjects },
    { title: "Productivity", value: `${productivity}%` },
  ];
  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6 ">
      {/* 🔝 Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {Cards.map((card, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-xl hover:shadow-xl/20 transition"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔹 Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">
          {/* 🟣 Today Focus */}
          <div className="bg-white p-6 rounded-2xl shadow-sm ">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3 ">
                Today's Focus
              </h2>
              <span className="text-sm">
                <Button content="Add Task" onClick={() => setShowModal(true)} />
              </span>
            </div>
            {showModal && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">
                  <h2 className="text-lg font-semibold mb-4">Add Task</h2>

                  {/* Title */}
                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  />

                  {/* duedate */}
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  />

                  {/* Project */}
                  <input
                    type="text"
                    placeholder="Project (optional)"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  />

                  {/* Priority */}
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleAddTask}
                      className="px-4 py-2 bg-purple-500 text-white rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
            <ul className="space-y-3 h-38 overflow-y-auto">
              {todaysTasks.length === 0 ? (
                <p className="text-gray-400 text-sm text-center ">
                  No tasks for today
                </p>
              ) : (
                todaysTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => toggleTaskStatus(task.id)}
                      className="accent-purple-500"
                    />

                    <div className="w-full flex justify-between items-center">
                      <span className="text-gray-700">{task.title}</span>
                      {/* priority badge */}
                      <div className="flex gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </span>

                        <MdEdit
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(task);
                          }}
                          className="text-lg text-gray-500 hover:text-blue-500 cursor-pointer"
                        />

                        <MdDelete
                          onClick={() => deleteTask(task.id)}
                          className="text-xl hover:text-red-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {showEditModal && (
              <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
                <div className="bg-white p-6 rounded-xl w-96">
                  <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

                  {/* Title */}
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  />

                  {/* Priority */}
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  {/* Deadline */}
                  <input
                    type="date"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                  />

                  {/* Buttons */}
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowEditModal(false)}>
                      Cancel
                    </button>

                    <button
                      onClick={handleUpdate}
                      className="bg-purple-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 📊 Chart Section */}
          <div className="bg-white pr-6 p-2 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 pl-5 pt-5">
              Productivity
            </h2>

            <div className="w-full h-[250px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* ⚡ Quick Add */}

          {/* ⏰ Deadlines */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Deadlines
            </h2>

            <ul className="space-y-3 text-sm">
              {upcomingTasks.length === 0 ? (
                <p className="text-gray-400">No upcoming deadlines</p>
              ) : (
                upcomingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{task.title}</span>

                    <span
                      className={`${
                        getDeadlineLabel(task.due) === "Today"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {getDeadlineLabel(task.due)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* projects */}
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Projects
            </h2>

            <div className="space-y-4">
              {projectData.length === 0 ? (
                <p className="text-gray-400 text-sm">No projects yet</p>
              ) : (
                projectData.map((proj, i) => {
                  const borderColor =
                    proj.progress > 70
                      ? "border-green-500"
                      : proj.progress > 40
                        ? "border-yellow-500"
                        : "border-red-500";

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-1 rounded-xl hover:bg-purple-50 transition"
                    >
                      {/* LEFT */}
                      <div>
                        <p className="text-sm font-medium text-gray-800 capitalize">
                          {proj.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {proj.progress}% completed
                        </p>
                      </div>

                      {/* RIGHT */}
                      <div className="relative w-15 h-15 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-7 border-gray-200"></div>

                        <div
                          className={`absolute inset-0 rounded-full border-7 ${borderColor}`}
                          style={{
                            clipPath: `inset(${100 - proj.progress}% 0 0 0)`,
                          }}
                        ></div>

                        <span className="text-[14px] font-semibold text-gray-700">
                          {proj.progress}%
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 🧠 Insights */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">Insights</h2>

            <p className="text-sm leading-relaxed">
              You completed <b>{todayCompleted}</b> tasks today ✔️
              <br />
              Most productive day: <b>
                {mostProductiveDay?.day || "N/A"}
              </b> 📈 <br />
              Completion rate: <b>{completionRate}%</b> <br />
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
