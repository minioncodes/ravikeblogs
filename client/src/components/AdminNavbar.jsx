import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/admin";
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full flex justify-center py-4 bg-transparent fixed top-0 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full md:w-[75%] bg-transparent rounded-[50px] px-9 py-10 shadow-xl flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-white md:text-green-700">
          Admin Panel
        </h1>

       
        <div className="hidden md:flex gap-6 items-center">
          <button className="text-green-800 font-medium hover:underline">
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-white">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[80px] w-full md:w-[75%] bg-white rounded-[40px] shadow-md md:hidden z-40 px-6 py-4"
          >
            <div className="flex flex-col items-start gap-4">
              <button className="text-green-700 font-medium hover:underline">
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminNavbar;
