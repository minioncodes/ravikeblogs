import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ravi from "../assets/ravi.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        style={{ fontFamily: "'Poppins', sans-serif" }}
        className={`
          fixed top-6 left-1/2 transform -translate-x-1/2
          w-[90vw] md:w-[75vw]
          bg-gradient-to-br from-white via-gray-100 to-green-100
          backdrop-blur-xl
          rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.1)]
          px-6 sm:px-10 py-4 sm:py-5 z-50 flex items-center justify-between
          transition-transform duration-500
          ${menuOpen ? "scale-95 shadow-md" : "scale-100"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={ravi} alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
          <span className="text-2xl sm:text-3xl font-bold text-green-700">
            Ravi's Vlog
          </span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-10 text-lg sm:text-xl font-medium text-gray-700">
          <a href="#about" className="hover:text-green-700 transition duration-300">
            About Me
          </a>
          <a href="#work" className="hover:text-green-700 transition duration-300">
            My Work
          </a>
        </div>

        {/* Sign In Button */}
        <div className="hidden sm:flex">
          <button className="px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? (
              <FiX className="w-8 h-8 text-green-700 rotate-90 transition duration-300" />
            ) : (
              <FiMenu className="w-8 h-8 text-green-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`
          fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center
          gap-8 text-xl font-semibold text-gray-700
          transition-all duration-500
          ${menuOpen ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-95 -translate-y-10 pointer-events-none"}
          sm:hidden
        `}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,255,240,0.9), rgba(245,245,245,0.85))",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setMenuOpen(false)}
          aria-label="Close Menu"
        >
          <FiX className="w-10 h-10 text-green-700 rotate-90 transition-transform duration-300" />
        </button>
        <a
          href="#about"
          onClick={() => setMenuOpen(false)}
          className="hover:text-green-700 transition duration-300"
        >
          About Me
        </a>
        <a
          href="#work"
          onClick={() => setMenuOpen(false)}
          className="hover:text-green-700 transition duration-300"
        >
          My Work
        </a>
        <button className="w-4/5 max-w-xs px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300 mt-10">
          Sign In
        </button>
      </div>
    </>
  );
};

export default Navbar;
