import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  const { title, description, category, image, _id } = blog;

  // Strip HTML tags from description for the preview
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const previewDescription = description
    ? stripHtml(description).slice(0, 180) + "..."
    : "No description available.";

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-[1.02] hover:shadow-primary/25 duration-300 cursor-pointer bg-white"
    >
      {/* Blog Image */}
      <img
        src={image || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={title || "Blog image"}
        className="aspect-video w-full object-cover"
      />

      {/* Category Tag */}
      {category && (
        <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
          {category}
        </span>
      )}

      {/* Blog Content */}
      <div className="p-5">
        <h5 className=" text-sm font-semibold text-gray-800">
          {title || "Untitled Blog"}
        </h5>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {previewDescription}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
