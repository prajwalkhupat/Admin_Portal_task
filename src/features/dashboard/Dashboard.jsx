
/*
import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar"; 
import CountUp from "react-countup"; 

const Dashboard = () => {

  // Injecting keyframes for fadeIn animation
  useEffect(() => {
    const styles = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{
        flexGrow: 1,
        padding: "40px",
        background: "linear-gradient(135deg, #ecf0f1, #dfe6e9)",
        overflow: "auto"
      }}>
        
        <h1 style={{ 
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#2c3e50",
          animation: "fadeInUp 0.8s ease forwards"
        }}>
          Welcome to the Admin Dashboard
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          
          <div style={cardStyle} className="card">
            <h2>Total Products</h2>
            <p style={cardValueStyle}>
              <CountUp end={124} duration={2} />
            </p>
          </div>

          <div style={cardStyle} className="card">
            <h2>Active Agents</h2>
            <p style={cardValueStyle}>
              <CountUp end={36} duration={2} />
            </p>
          </div>

          <div style={cardStyle} className="card">
            <h2>Pending Orders</h2>
            <p style={cardValueStyle}>
              <CountUp end={18} duration={2} />
            </p>
          </div>

          <div style={cardStyle} className="card">
            <h2>Revenue</h2>
            <p style={cardValueStyle}>
              <CountUp end={150000} prefix="₹" duration={2} separator="," />
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

// Card Styles
const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease",
  cursor: "pointer",
  animation: "fadeInUp 0.8s ease forwards",
};

const cardValueStyle = {
  fontSize: "32px",
  marginTop: "10px",
  color: "#3498db",
  fontWeight: "bold"
};

export default Dashboard;


*/

import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { FaBars } from "react-icons/fa"; // Hamburger icon
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
      {/* Sidebar */}
      <div className={`fixed z-20 inset-y-0 left-0 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:inset-0`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 overflow-auto">
        
        {/* Top bar for mobile */}
        <div className="flex items-center p-4 shadow-sm sm:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl"
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-bold ml-4 text-gray-700">Dashboard</h1>
        </div>

        {/* Dashboard Content */}
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
