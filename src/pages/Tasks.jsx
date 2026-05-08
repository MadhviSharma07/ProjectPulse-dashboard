import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "../Other components/Button";
import useTasks  from "../context/TaskContext"; 

function Tasks() {
  const {tasks , addTask, deleteTask, toggleTaskStatus} = useTasks(); // Custom hook for task management

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [showInput, setShowInput] = useState(false);

  // ✅ Form states
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");
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
    setPriority("Medium");
    setDueDate("");
    setShowInput(false);
  };

 

  // ✅ Filter + Search
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed" && !task.status=== "completed") return false;
    if (filter === "Pending" && task.status=== "completed") return false;
    return task.title.toLowerCase().includes(search.toLowerCase());
  });

  // ✅ Priority Color
  const getPriorityColor = (priority) => {
    if (priority === "High") return "text-red-500";
    if (priority === "Medium") return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">My Task</h1>
        <Button
          onClick={() => setShowInput(true)}
          className="shadow-xl"
          content="Add Task"
        />
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl border"
        />

        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl ${
              filter === f ? "bg-purple-500 text-white" : "bg-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ✅ MODAL */}
      {showInput && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Add Task</h2>

            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border mb-3"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border mb-3"
            />

            <input
              type="text"
              placeholder="Project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full p-2 border mb-3"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border mb-4"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowInput(false)}>Cancel</button>
              <button
                onClick={handleAddTask}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task List */}
      <div className="bg-white p-6 rounded-2xl">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found 🚀</p>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between p-3 hover:bg-purple-50"
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
                        task.status==="completed" ? "line-through text-gray-400" : ""
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
                  <span className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </span>

                  <MdDelete
                    onClick={() => deleteTask(task.id)}
                    className="cursor-pointer hover:text-red-500 text-xl"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tasks;