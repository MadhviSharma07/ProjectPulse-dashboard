import React, { useState } from "react";
import Button from "../Other components/Button";
import { MdDelete } from "react-icons/md";
import useTasks from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function Projects() {
  const { tasks, addTask, deleteTask } = useTasks();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskInputs, setTaskInputs] = useState([""]);
  const [search, setSearch] = useState("");

  // 🔥 GROUP TASKS INTO PROJECTS
  const projectMap = {};

  tasks.forEach((task) => {
    if (!task.project) return;
    if (!projectMap[task.project]) {
      projectMap[task.project] = [];
    }
    projectMap[task.project].push(task);
  });

  const projects = Object.entries(projectMap).map(([name, tasks]) => ({
    name,
    tasks,
  }));

  // 🔥 CALCULATE PROGRESS
  const getProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const done = tasks.filter((t) => t.status === "completed").length;
    return Math.round((done / tasks.length) * 100);
  };

  // 🔥 ADD TASK FIELD
  const addTaskField = () => {
    setTaskInputs([...taskInputs, ""]);
  };

  const handleTaskChange = (i, value) => {
    const updated = [...taskInputs];
    updated[i] = value;
    setTaskInputs(updated);
  };

  // 🔥 SAVE PROJECT (actually adds tasks)
  const handleSave = () => {
    if (!projectName) return;

    taskInputs.forEach((t) => {
      if (t.trim()) {
        addTask({
          title: t,
          project: projectName,
        });
      }
    });

    setProjectName("");
    setTaskInputs([""]);
    setShowModal(false);
  };

  // 🔥 DELETE PROJECT (delete all its tasks)
  const handleDeleteProject = (projectName) => {
    const projectTasks = tasks.filter((t) => t.project === projectName);
    projectTasks.forEach((t) => deleteTask(t.id));
  };

  // 🔍 SEARCH
  const filteredProjects = projects.filter((proj) =>
    proj.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Projects
        </h1>
        <Button content="New Project" onClick={() => setShowModal(true)} />
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-lg font-semibold mb-4">
              Create Project
            </h2>

            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            {taskInputs.map((task, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Task ${i + 1}`}
                value={task}
                onChange={(e) => handleTaskChange(i, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
            ))}

            <button
              onClick={addTaskField}
              className="text-sm text-purple-500 mb-3"
            >
              + Add Task
            </button>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>

              <button
                onClick={handleSave}
                className="bg-purple-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded-xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-3 gap-6">

        {filteredProjects.map((proj, i) => {
          const progress = getProgress(proj.tasks);

          return (
            <div
              key={i}
              className="cursor-pointer bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl hover:shadow-xl/20 transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {proj.name}
                </h2>

                <MdDelete
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(proj.name);
                  }}
                  className="text-xl text-gray-500 hover:text-red-500 cursor-pointer"
                />
              </div>

              <p className="text-sm text-gray-500 mb-3">
                {proj.tasks.length} Tasks
              </p>

              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-purple-400 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {progress}% completed
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Projects;