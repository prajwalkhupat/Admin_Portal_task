

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { FaBars } from "react-icons/fa"; 
import CountUp from "react-countup";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Injecting keyframes for fadeIn animation
  useEffect(() => {
    const styles = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div className="flex min-h-screen">  
      <div className={`fixed z-20 inset-y-0 left-0 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:inset-0`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 overflow-auto">
        
        <div className="flex items-center p-4 shadow-sm sm:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl"
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-bold ml-4 text-gray-700">Dashboard</h1>
        </div>

        <div className="p-6">
          <h1
            className="mb-8 text-3xl sm:text-4xl font-bold text-center text-gray-800 animate-fadeInUp"
            style={{ animation: "fadeInUp 0.8s ease forwards" }}
          >
            Welcome to the Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Products" value={<CountUp end={124} duration={2} />} />
            <Card title="Active Agents" value={<CountUp end={36} duration={2} />} />
            <Card title="Pending Orders" value={<CountUp end={18} duration={2} />} />
            <Card title="Revenue" value={<CountUp end={150000} prefix="₹" duration={2} separator="," />} />
          </div>
        </div>

      </div>
    </div>
  );
};

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300 animate-fadeInUp">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <p className="text-3xl mt-3 text-blue-500 font-bold">{value}</p>
    </div>
  );
}

export default Dashboard;
