import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const {navigate, token} = useAppContext();

  return (
    <nav className="w-full ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 lg:px-16 py-3 cursor-pointer">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="logo"
            className="w-28 sm:w-40 object-contain select-none cursor-pointer"
          />
        </div>

        {/* Admin Login Button */}
        <button
          className="group flex items-center gap-2 bg-[#5044e5] text-white font-medium
          px-5 py-2 rounded-full sm:text-sm hover:bg-[#3f35cc] active:scale-95
          transition-all duration-300 border border-black"
          onClick={() => navigate("/admin")}
        >
          <span>{token ? "Dashboard" : "Login"}</span>
          <img
            src={assets.arrow}
            alt="arrow"
            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
