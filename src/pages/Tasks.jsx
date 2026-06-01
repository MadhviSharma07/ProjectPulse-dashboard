import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "../Other components/Button";
import useTasks from "../context/TaskContext";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";

function Tasks() {
  const { tasks, updateTask, addTask, deleteTask, toggleTaskStatus } =
    useTasks(); // Custom hook for task management
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("high");
  const [editDeadline, setEditDeadline] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);

  // ✅ Form states
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("high");
  const [dueDate, setDueDate] = useState("");

  // ✅ Add Task
  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      project,
      priority,
      dueDate,
      status: "pending",
    };
    addTask(newTask);
    // reset
    setTitle("");
    setProject("");
    setPriority("high");
    setDueDate("");
    setShowInput(false);
  };

  // ✅ Edit Task
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  useEffect(() => {
    if (selectedTask) {
      setEditTitle(selectedTask.title);
      setEditPriority(selectedTask.priority || "high");
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

  // ✅ Filter + Search
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed" && task.status !== "completed") return false;
    if (filter === "Pending" && task.status !== "pending") return false;
    return task.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F8F2FC] dark:bg-zinc-700/50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">My Task</h1>
        <Button
          onClick={() => setShowInput(true)}
          className="shadow-xl"
          content="Add Task"
        />
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[300px] px-4 py-2.5 rounded-xl border border-gray-500 dark:bg-zinc-300  dark:border-purple-400/40 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl ${
              filter === f ? "bg-purple-500 text-white" : "bg-white dark:bg-zinc-300/30 dark:text-white dark:border-purple-400/40 border border-gray-500 text-sm"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* MODAL */}
      {showInput && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-5 md:px-0">
          <div className="bg-white p-6 rounded-2xl w-[400px] dark:bg-zinc-800  border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Add Task</h2>

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border mb-3 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border mb-3 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
            />

            <input
              type="text"
              placeholder="Project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full p-2 border mb-3 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border mb-4 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowInput(false)}
                variant="secondary"
                content="Cancel"
              />
              <Button onClick={handleAddTask} content="Add" />
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="bg-white p-6 rounded-2xl  dark:bg-zinc-800/60 border border-transparent  dark:border-purple-400/40
    ">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found 🚀</p>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between p-3 hover:bg-purple-50 hover:dark:bg-purple-600/10 rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleTaskStatus(task.id)}
                    className="accent-purple-500"
                  />

                  <div>
                    <p
                      className={
                        task.status === "completed"
                          ? "line-through text-gray-400"
                          : " dark:text-gray-300"
                      }
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {task.project} | {task.dueDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800  dark:bg-red-600/20 dark:text-red-300/70 "
                        : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-600/20 dark:text-yellow-300/70"
                          : "bg-green-100 text-green-800 dark:bg-green-600/20 dark:text-green-300/70"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <MdEdit
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(task);
                    }}
                    className="text-lg text-gray-500 hover:text-blue-500 cursor-pointer dark:text-gray-400"
                  />

                  <MdDelete
                    onClick={() => deleteTask(task.id)}
                    className="cursor-pointer hover:text-red-500 text-xl dark:text-gray-400"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 dark:bg-zinc-800 border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Edit Task</h2>

            {/* Title */}
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 border rounded mb-3 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
            />

            {/* Priority */}
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="w-full p-2 border rounded mb-3 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
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
              className="w-full p-2 border rounded mb-3 dark:bg-zinc-700/30 dark:text-white dark:border-gray-500"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowEditModal(false)}
                variant="secondary"
                content="Cancel"
                
              />

              <Button
                onClick={handleUpdate}
                content="Update"
                className="bg-blue-500 text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
