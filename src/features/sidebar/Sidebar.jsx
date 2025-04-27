

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 768) { 
      setIsOpen(false); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded" 
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-lg flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen`}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Admin Portal</h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="text-left w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Dashboard Home
          </button>
          <button
            onClick={() => handleNavigate("/products")}
            className="text-left w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Products
          </button>
          <button
            onClick={() => handleNavigate("/agents")}
            className="text-left w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Agents
          </button>
          <button
            onClick={() => handleNavigate("/orders")}
            className="text-left w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Orders
          </button>
        </nav>

        {/* Logout button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="text-left w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
