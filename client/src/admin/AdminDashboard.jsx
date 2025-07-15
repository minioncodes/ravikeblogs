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
import { motion, AnimatePresence } from "framer-motion";
import Gallery from "./Gallery";
import AddImages from "./AddImages";
import ChangePassword from "./ChangePassword";
import UploadImages from "./UploadManyImages";

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
        return <UploadImages />;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 bg-black/40 backdrop-blur sticky top-0 z-50">
        <h2 className="text-xl font-bold text-green-400">Admin Panel</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay for small screens */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-black/60 backdrop-blur-md z-50 p-6 shadow-lg"
            >
              <Sidebar
                activeSection={activeSection}
                setActiveSection={(section) => {
                  setActiveSection(section);
                  setSidebarOpen(false);
                }}
                handleLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-4 py-6 md:px-6 transition-all duration-300">
        {renderSection()}
      </main>
    </div>
  );
};


const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => {
  const items = [
    { key: "gallery", icon: <FiImage />, label: "Gallery" },
    { key: "upload", icon: <FiUpload />, label: "Upload New" },
    { key: "sort", icon: <FiSettings />, label: "Sort Pictures" },
    { key: "change-password", icon: <FiLock />, label: "Change Password" },
  ];

  return (
    <nav className="space-y-4 text-[16px] font-medium">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveSection(item.key)}
          className={`flex items-center gap-3 w-full text-left px-2 py-2 rounded-md transition-all duration-200 ${
            activeSection === item.key
              ? "text-green-400 bg-white/10"
              : "text-white hover:text-green-400 hover:bg-white/10"
          }`}
        >
          {item.icon} {item.label}
        </button>
      ))}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full text-left text-red-500 hover:text-red-400 px-2 pt-6"
      >
        <FiLogOut /> Logout
      </button>
    </nav>
  );
};

export default AdminDashboard;
