import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BlogList = () => {
  const { axios, input } = useAppContext(); // ✅ include input from context
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [menu, setMenu] = useState("All");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);

        // Extract unique categories
        const uniqueCats = [
          "All",
          ...new Set(data.blogs.map((blog) => blog.category)),
        ];
        setCategories(uniqueCats);
      } else {
        console.error("Failed to fetch blogs:", data.message);
        toast.error("Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Something went wrong while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Category filter
  const categoryFiltered =
    menu === "All" ? blogs : blogs.filter((blog) => blog.category === menu);

  // ✅ Search filter (matches title or description)
  const searchFiltered = categoryFiltered.filter((blog) => {
    if (!input) return true; // show all if no search input
    const query = input.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Category Buttons */}
      <div className="flex justify-center flex-wrap gap-4 my-12">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className="relative px-4 py-2 rounded-full transition-colors overflow-hidden cursor-pointer"
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
      {loading ? (
        <p className="text-center text-gray-500 py-20 animate-pulse">
          Loading blogs...
        </p>
      ) : searchFiltered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {searchFiltered.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No blogs found matching your search.
        </p>
      )}
    </div>
  );
};

export default BlogList;
