import React from "react";
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
  // 🔹 Sample Data (later connect with your real tasks)
  const weeklyData = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 4 },
    { day: "Wed", tasks: 3 },
    { day: "Thu", tasks: 6 },
    { day: "Fri", tasks: 5 },
    { day: "Sat", tasks: 2 },
    { day: "Sun", tasks: 1 },
  ];

  const taskStatus = [
    { name: "Completed", value: 18 },
    { name: "Pending", value: 7 },
  ];

  const priorityData = [
    { name: "High", value: 5 },
    { name: "Medium", value: 10 },
    { name: "Low", value: 10 },
  ];

  const COLORS = ["#8B5CF6", "#dbd2f0"]; // purple + gray
  const BAR_COLORS = ["#EF4444", "#F59E0B", "#10B981"];

  return (
    <div className="min-h-screen bg-[#F8F2FC] p-6">

      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Analytics
        </h1>

        <select className="bg-white p-2 rounded-lg shadow-sm">
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Tasks", value: 25 },
          { title: "Completed", value: 18 },
          { title: "Pending", value: 7 },
          { title: "Productivity", value: "72%" },
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
            <h2 className="text-lg font-semibold mb-4">
              Weekly Productivity
            </h2>

            <LineChart width={600} height={250} data={weeklyData}>
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
          </div>

          {/* 📊 Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Task Priority
            </h2>

            <BarChart width={600} height={250} data={priorityData}>
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
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* 🥧 Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              Task Status
            </h2>

            <PieChart width={250} height={250}>
              <Pie
                data={taskStatus}
                dataKey="value"
                outerRadius={80}
                label
              >
                {taskStatus.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </div>

          {/* 🧠 Insights */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-2">
              Insights
            </h2>
            <p className="text-sm">
              You completed 18 tasks this week 🚀 <br />
              Most productive day: Thursday <br />
              Keep up the momentum!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Analytics;