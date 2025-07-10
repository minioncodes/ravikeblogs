import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");
  const [activeSection, setActiveSection] = useState("home");
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
      case "home":
        return (
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">All Pictures</h1>
            <p className="text-gray-300">Here you can view all uploaded images.</p>
          </div>
        );
      case "upload":
        return (
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">Upload New</h1>
            <p className="text-gray-300">Upload new pictures to the gallery.</p>
          </div>
        );
      case "sort":
        return (
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">Sort Pictures</h1>
            <p className="text-gray-300">Organize and sort your pictures.</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">Change Password</h1>
            <p className="text-gray-300">Update your account password.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

    
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-700 bg-black bg-opacity-40 backdrop-blur-lg">
        <h2 className="text-xl font-bold text-green-400">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-2xl">
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

  
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 h-full md:h-screen bg-black bg-opacity-30 backdrop-blur-lg border-r border-gray-700 p-6 fixed md:relative z-50`}
      >
        <nav className="space-y-5 text-lg font-medium">
          <button onClick={() => { setActiveSection("home"); setSidebarOpen(false); }} className="block w-full text-left hover:text-green-400">
             All Pictures
          </button>
          <button onClick={() => { setActiveSection("upload"); setSidebarOpen(false); }} className="block w-full text-left hover:text-green-400">
            Upload New
          </button>
          <button onClick={() => { setActiveSection("sort"); setSidebarOpen(false); }} className="block w-full text-left hover:text-green-400">
            Sort Pictures
          </button>
          <button onClick={() => { setActiveSection("settings"); setSidebarOpen(false); }} className="block w-full text-left hover:text-green-400">
             Change Password
          </button>
          <button
            onClick={handleLogout}
            className="block text-left text-red-500 hover:text-red-400 w-full pt-4"
          >
            Logout
          </button>
        </nav>
      </aside>

     
      <main className="flex-1 p-6 md:ml-64 mt-16 md:mt-0">{renderSection()}</main>
    </div>
  );
};

export default AdminDashboard;
