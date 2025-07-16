import React from "react";
import ravi from "../assets/ravi.svg";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <nav
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className={`
                    fixed top-2 left-1/2 transform -translate-x-1/2
                    w-[90vw] md:w-[75vw]
                    bg-transparent
                    backdrop-blur-xl
                    rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.1)]
                    px-6 sm:px-10 py-4 sm:py-5 z-50 flex items-center justify-between
                    transition-transform duration-500
                    scale-100
                `}
            >
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={ravi} alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
                        <span className="text-2xl sm:text-3xl font-bold text-green-700"></span>
                    </Link>
                </div>

      
                <div className=" md:flex">
                    <button className="px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition duration-300">
                        Get In Touch
                    </button>
                </div>

            </nav>
        </>
    );
};

export default Navbar;
