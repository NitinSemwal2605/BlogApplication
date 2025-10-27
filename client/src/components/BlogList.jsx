import React, { useState } from "react";
import { blogCategories, blog_data } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const filteredBlogs =
    menu === "All"
      ? blog_data
      : blog_data.filter((blog) => blog.category === menu);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Category Buttons */}
      <div className="flex justify-center flex-wrap gap-4 my-12">
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className="relative px-4 py-2 rounded-full text-black transition-colors overflow-hidden cursor-pointer"
          >
            {menu === item && (
              <motion.span
                layoutId="activeBackground"
                className="absolute inset-0 bg-primary/80 rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span
              className={`relative z-10 ${
                menu === item ? "text-white" : "text-black"
              }`}
            >
              {item}
            </span>
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No blogs found for "{menu}" category.
        </p>
      )}
    </div>
  );
};

export default BlogList;
