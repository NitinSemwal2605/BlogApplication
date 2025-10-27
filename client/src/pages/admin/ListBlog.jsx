/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
 */

import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // Load local data from assets
    setBlogs(dashboard_data.recentBlogs)
  }, [])

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">All Blogs</h2>

      <div className="relative w-full overflow-x-auto shadow rounded-lg bg-white">
        <table className="w-full text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
            <tr>
              <th className="px-4 py-4 text-left font-semibold">#</th>
              <th className="px-4 py-4 text-left font-semibold">Blog Title</th>
              <th className="px-4 py-4 text-left font-semibold">Date</th>
              <th className="px-4 py-4 text-left font-semibold">Status</th>
              <th className="px-4 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs && blogs.length > 0 ? (
              blogs.map((blog, index) => {
                const blogDate = new Date(blog.createdAt)
                return (
                  <tr
                    key={blog._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-gray-800">{blog.title}</td>
                    <td className="px-4 py-4 text-gray-500">
                      {blogDate.toDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`font-medium ${
                          blog.isPublished
                            ? 'text-green-600'
                            : 'text-red-500'
                        }`}
                      >
                        {blog.isPublished ? 'Published' : 'Unpublished'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {blog.isPublished ? (
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-100">
                            Unpublish
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                            Publish
                          </button>
                        )}

                        <button className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 hover:bg-red-100">
                          <img
                            src={assets.cross_icon}
                            alt="Delete"
                            className="w-3 h-3"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 text-sm"
                >
                  No blogs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogList
