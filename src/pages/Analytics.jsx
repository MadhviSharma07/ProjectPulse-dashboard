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

  const COLORS = ["#8B5CF6", "#c4aff5"]; // purple + gray
  const BAR_COLORS = ["#EF4444", "#F59E0B", "#10B981"];

  return (
    <div className="min-h-screen bg-[#F8F2FC] dark:bg-zinc-700/50  p-6">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>

        <select className="bg-white dark:bg-zinc-600  dark:text-white p-2 rounded-lg shadow-sm">
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ">
        {[
          { title: "Total Tasks", value: totalTasks },
          { title: "Completed", value: completedTasks },
          { title: "Pending", value: pendingTasks },
          { title: "Productivity", value: `${productivity}%` },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-xl hover:shadow-xl/20 dark:bg-zinc-800/60 border border-transparent  dark:border-purple-400/40
    hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] "
          >
            <p className="text-gray-500 text-sm dark:text-white">{card.title}</p>
            <h2 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔹 Charts Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6 ">
          {/* 📈 Line Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm w-full overflow-hidden  dark:bg-zinc-800/60 border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Weekly Productivity
              </h2>
            </div>

            <div className="w-full w-min-0 h-[220px] sm:h-[250px]">
              <ResponsiveContainer
                width="100%"
                height={window.innerWidth < 640 ? 220 : 260}
              >
                <LineChart
                  data={weeklyData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: -20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="2 2" />

                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />

                  <YAxis tick={{ fontSize: 12 }} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* 📊 Bar Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm w-full overflow-hidden  dark:bg-zinc-800/60 border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300
  ">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 ">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Task Priority
              </h2>

              <div className="text-xs sm:text-sm text-purple-500 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-lg">
                Overview
              </div>
            </div>

            {/* Chart */}
            <div className="w-full w-min-0 h-[220px] sm:h-[260px]">
              <ResponsiveContainer
                width="100%"
                height={window.innerWidth < 600 ? 220 : 280}
              >
                <BarChart
                  data={priorityData}
                  margin={{
                    top: 10,
                    right: 5,
                    left: -20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />

                  <YAxis tick={{ fontSize: 12 }} />

                  <Tooltip />

                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {priorityData.map((entry, index) => (
                      <Cell key={index} fill={BAR_COLORS[index]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* 🥧 Pie Chart */}
          <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-5 w-full overflow-hidden  dark:bg-zinc-800/60 border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between ">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  Task Status
                </h2>

                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Progress overview of your tasks
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 text-purple-600 text-xs sm:text-sm px-3 py-1 rounded-xl font-medium">
                Analytics
              </div>
            </div>

            {/* Chart */}
            <div className="w-full h-[260px] sm:h-[320px] flex items-center justify-center">
              <ResponsiveContainer
                width="100%"
                height={window.innerWidth < 640 ? 220 : 250}
              >
                <PieChart>
                  <Pie
                    data={taskStatus}
                    dataKey="value"
                    nameKey="name"
                    cx="48%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={4}
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {taskStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              {taskStatus.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></span>

                  <p className="text-sm text-gray-600">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🧠 Insights */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-500  text-white p-6 rounded-2xl shadow  shadow-sm dark:from-[#370850] dark:to-[#6E15AF] border border-transparent dark:border-purple-400/30 hover:dark:shadow-[0_0_20px_rgba(192,132,252,0.25)] transition-all duration-300">
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
