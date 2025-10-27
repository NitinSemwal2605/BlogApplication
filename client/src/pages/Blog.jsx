import React, { useEffect, useState } from "react";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import { useParams } from "react-router-dom";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  // Fetch blog
  const fetchBlogData = () => {
    const foundData = blog_data.find((item) => item._id === id);
    setData(foundData);
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  // Fetch comments
  const fetchComments = () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return data ? (
    <div className="relative min-h-screen bg-white text-gray-700">
      {/* Background */}
      <img
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 object-cover"
        src={assets.gradientBackground}
        alt=""
      />

      <Navbar />

      <div className="text-center mt-20 text-gray-600 px-4">
        {/* Date */}
        <p className="text-primary py-2 font-medium">
          Published {Moment(data.createdAt).fromNow()}
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-snug">
          {data.title}
        </h1>

        {/* Subtitle */}
        <h2 className="my-4 text-lg text-gray-600 max-w-xl mx-auto italic">
          {data.subTitle}
        </h2>

        <p className="inline-block py-1 px-4 rounded-full mb-10 border text-sm border-primary/40 bg-primary/5 font-medium text-primary">
          By Nitin Semwal
        </p>

        {/* Blog Content */}
        <div className="mx-auto max-w-5xl px-4">
          <img
            className="rounded-3xl w-full object-cover shadow-lg mb-12"
            src={data.image}
            alt={data.title}
          />

          <div
            className="prose prose-lg text-left mx-auto max-w-3xl prose-headings:text-gray-800 prose-p:text-gray-700 mb-16"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>

          {/* --- Share This Article Section --- */}
          <div className="mt-10 mb-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Share this article 📢
            </h3>
            <p className="text-gray-600 mb-6">
              Spread the word on your favorite platform
            </p>

            <div className="flex justify-center gap-5 flex-wrap">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <FaFacebookF className="text-lg" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}&text=${encodeURIComponent(data.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition"
              >
                <FaXTwitter className="text-lg" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-sky-700 text-white hover:bg-sky-800 transition"
              >
                <FaLinkedinIn className="text-lg" />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  data.title
                )}%20${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </div>

          {/* --- Comments Section --- */}
          <div className="mt-20 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Comments Header */}
              <div className="flex flex-col items-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Comments <span className="text-primary">({comments.length})</span>
                </h3>
                <div className="w-24 h-[3px] bg-primary/60 mt-3 rounded-full"></div>
              </div>

              {/* Comments List */}
              <div className="space-y-6 mb-12 text-left">
                {comments.length > 0 ? (
                  comments.map((item, index) => (
                    <div
                      key={index}
                      className="group flex gap-4 border border-gray-200 rounded-xl p-5 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {/* User Avatar */}
                      <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 font-semibold text-sm shrink-0">
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      {/* Comment Body */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {item.name}
                          </p>
                          <span
                            className="text-xs text-gray-500"
                            title={Moment(item.createdAt).format("MMMM Do YYYY, h:mm A")}
                          >
                            {Moment(item.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center italic">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>

              {/* Add Comment Form */}
              <div className="border-t border-gray-200 pt-10">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">
                  Add your comment 💬
                </h4>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-5 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm mx-auto max-w-2xl"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition placeholder:text-gray-400"
                    />
                  </div>
                  <textarea
                    placeholder="Write your comment..."
                    rows="4"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 resize-none transition placeholder:text-gray-400"
                  ></textarea>
                  <button
                    type="submit"
                    className="self-center bg-primary text-white px-8 py-2.5 rounded-md font-medium hover:bg-primary/90 active:scale-[0.98] transition-all"
                  >
                    Submit Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* --- End Comments Section --- */}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
      Loading...
    </div>
  );
};

export default Blog;
