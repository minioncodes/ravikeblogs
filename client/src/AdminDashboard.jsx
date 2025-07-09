import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState("");

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
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-green-100 to-gray-300 p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Logged in as: <span className="font-semibold">{adminEmail}</span>
        </p>

        {/* Dashboard features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-3">📤 Upload Images</h2>
            <p className="text-sm text-gray-600">Coming soon: Upload new blog images</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-3">🗑️ Delete Images</h2>
            <p className="text-sm text-gray-600">Coming soon: Manage uploaded content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
