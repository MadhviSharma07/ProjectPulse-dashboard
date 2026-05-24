import React from "react";
import useTasks from "../context/TaskContext";
import { ResponsiveContainer } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

function Analytics() {
  const { tasks } = useTasks();
  // 🔹 Sample Data (later connect with your real tasks)
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyData = days.map((day, index) => {
    const count = tasks.filter((task) => {
      if (!task.completedAt) return false;

      return new Date(task.completedAt).getDay() === index;
    }).length;

    return {
      day,
      tasks: count,
    };
  });

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "pending").length;

  const totalTasks = tasks.length;

  const productivity =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const taskStatus = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  //insights
  const mostProductiveDay = weeklyData.reduce((max, day) =>
    day.tasks > max.tasks ? day : max,
  );

  //priorities of the tasks
  const priorityData = [
    {
      name: "High",
      value: tasks.filter((t) => t.priority === "high").length,
    },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "medium").length,
    },
    {
      name: "Low",
      value: tasks.filter((t) => t.priority === "low").length,
    },
  ];

  const COLORS = ["#8B5CF6", "#dbd2f0"]; // purple + gray
  const BAR_COLORS = ["#EF4444", "#F59E0B", "#10B981"];

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>

        <select className="bg-white p-2 rounded-lg shadow-sm">
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Tasks", value: totalTasks },
          { title: "Completed", value: completedTasks },
          { title: "Pending", value: pendingTasks },
          { title: "Productivity", value: `${productivity}%` },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-xl hover:shadow-xl/20"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-800">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔹 Charts Layout */}
      <div className="grid grid-cols-3 gap-6 ">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          {/* 📈 Line Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Weekly Productivity</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Task Priority</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {priorityData.map((entry, index) => (
                    <Cell key={index} fill={BAR_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* 🥧 Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Task Status</h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={taskStatus} dataKey="value" outerRadius={80} label>
                  {taskStatus.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 🧠 Insights */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">Insights</h2>
            <p className="text-sm">
              You completed {completedTasks} tasks 🚀 <br />
              Most productive day: {mostProductiveDay.day} <br />
              Productivity score: {productivity}% <br />
              Keep up the momentum!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
