import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  // Handle form submission (when pressing "Enter" or clicking Search)
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    setInput(value);
  };

  // Clear search and input field
  const onClear = () => {
    setInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="relative text-center py-20 px-6 sm:px-16 xl:px-24 overflow-hidden">
      {/* Background gradient image */}
      <img
        src={assets.gradientBackground}
        alt="Decorative gradient background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
      />

      {/* Notification Bar */}
      <div className="inline-flex items-center justify-center gap-3 px-6 py-2 mb-8 border border-primary/40 bg-primary/10 rounded-full text-sm font-medium text-primary shadow-sm hover:bg-primary/20 transition">
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
      <form
        onSubmit={onSubmitHandler}
        className="mt-8 flex items-center justify-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search blogs..."
          defaultValue={input}
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

      {/* Clear Button */}
      {input && (
        <div className="mt-4">
          <button
            onClick={onClear}
            className="border border-gray-300 font-light text-xs py-1 px-3 rounded shadow-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
};

export default Header;
