import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="relative text-center py-20 px-6 sm:px-16 xl:px-24 overflow-hidden">
      {/* Background gradient image */}
      <img
        src={assets.gradientBackground}
        alt="Decorative gradient background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
      />

      {/* Notification Bar */}
      <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 border border-primary/40 bg-primary/10 rounded-full text-sm font-medium text-primary shadow-sm hover:bg-primary/20 transition">
        <img src={assets.star_icon} alt="Star icon" className="w-4 h-4" />
        <span>New: AI Feature Integrated</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-snug">
        Your Own{" "}
        <span className="text-primary cursor-pointer">Blogging</span> <br />
        Platform.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        This is your space to think out loud, share what matters, and write
        without filters. Whether it’s one word or a thousand, your story starts
        right here.
      </p>

      {/* Search Bar */}
      <form className="mt-8 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-64 sm:w-80 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-primary transition"
          aria-label="Search blogs"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default Header;
