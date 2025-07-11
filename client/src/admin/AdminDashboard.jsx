import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiImage,
  FiUpload,
  FiSettings,
  FiLock,
  FiLogOut,
} from "react-icons/fi";
import Gallery from "./Gallery";
import AddImages from "./AddImages";
import ChangePassword from "./ChangePassword";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [activeSection, setActiveSection] = useState("gallery");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const email = localStorage.getItem("admin_email");

    if (!token) {
      navigate("/admin");
    } else {
      setAdminEmail(email);
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_email");
    navigate("/");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "gallery":
        return <Gallery />;
      case "upload":
        return <AddImages />;
      case "sort":
        return (
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">Sort Pictures</h1>
            <p className="text-gray-300">Feature coming soon!</p>
          </div>
        );
      case "change-password":
        return <ChangePassword />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-[Inter] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
 
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-black bg-opacity-40 backdrop-blur-lg sticky top-0 z-40">
        <h2 className="text-xl font-bold text-green-400">Admin Panel</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className="flex">
    
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 h-screen bg-black bg-opacity-30 backdrop-blur-md border-r border-gray-700 p-6 fixed md:relative z-50 top-16 md:top-0 overflow-y-auto`}
        >
          <nav className="space-y-4 text-[16px] font-medium">
            <button
              onClick={() => {
                setActiveSection("gallery");
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md transition-all duration-200 ${
                activeSection === "gallery"
                  ? "text-green-400 bg-white/10"
                  : "text-white hover:text-green-400 hover:bg-white/10"
              }`}
            >
              <FiImage /> Gallery
            </button>

            <button
              onClick={() => {
                setActiveSection("upload");
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md transition-all duration-200 ${
                activeSection === "upload"
                  ? "text-green-400 bg-white/10"
                  : "text-white hover:text-green-400 hover:bg-white/10"
              }`}
            >
              <FiUpload /> Upload New
            </button>

            <button
              onClick={() => {
                setActiveSection("sort");
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md transition-all duration-200 ${
                activeSection === "sort"
                  ? "text-green-400 bg-white/10"
                  : "text-white hover:text-green-400 hover:bg-white/10"
              }`}
            >
              <FiSettings /> Sort Pictures
            </button>

            <button
              onClick={() => {
                setActiveSection("change-password");
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md transition-all duration-200 ${
                activeSection === "change-password"
                  ? "text-green-400 bg-white/10"
                  : "text-white hover:text-green-400 hover:bg-white/10"
              }`}
            >
              <FiLock /> Change Password
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left text-red-500 hover:text-red-400 px-2 pt-6"
            >
              <FiLogOut /> Logout
            </button>
          </nav>
        </aside>

        
        <main className="flex-1 p-6 pt-20 md:pt-6 md:ml-64 transition-all duration-300">
          <div className="max-w-6xl mx-auto">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
