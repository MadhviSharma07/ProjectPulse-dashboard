import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // 🔹 Load tasks from localStorage (on app start)
useEffect(() => {
  try {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (Array.isArray(savedTasks)) {
      const formattedTasks = savedTasks.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt
          ? new Date(task.completedAt)
          : null,
      }));

      setTasks(formattedTasks);
    }
  } catch (err) {
    console.error(err);
  }
}, []);

  // 🔹 Save tasks to localStorage (whenever tasks change)
 useEffect(() => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (err) {
    console.error("Error saving tasks:", err);
  }
}, [tasks]);

  // 🔹 Add Task
 const addTask = (task) => {
  setTasks((prev) => [
    ...prev,
    {
      id: Date.now() + Math.random(),
      status: "pending",
      createdAt: new Date(),
      dueDate: task.dueDate, 
      project: task.project, // 🔥 important
      ...task,
    },
  ]);
};

  // 🔹 Delete Task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 🔹 Toggle Complete / Pending
  const toggleTaskStatus = (id) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === "completed" ? "pending" : "completed",
            completedAt:
              task.status === "pending" ? new Date() : null, 
          }
        : task
    )
  );
};

  // 🔹 Edit Task
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskStatus,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// 🔹 Custom Hook (clean usage)
export default function useTasks() {
  return useContext(TaskContext);
}