/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
 */

import React, { useEffect, useState } from 'react'
import { assets, comments_data } from '../../assets/assets'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('approved') // 'approved' | 'notApproved'

  useEffect(() => {
    // Load from assets
    setComments(comments_data)
  }, [])

  const filteredComments = comments.filter((c) =>
    filter === 'approved' ? c.isApproved : !c.isApproved
  )

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Comments</h2>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            filter === 'approved'
              ? 'bg-white border-indigo-500 text-indigo-600 font-medium'
              : 'bg-transparent border-gray-300 text-gray-500'
          }`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>

        <button
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            filter === 'notApproved'
              ? 'bg-white border-indigo-500 text-indigo-600 font-medium'
              : 'bg-transparent border-gray-300 text-gray-500'
          }`}
          onClick={() => setFilter('notApproved')}
        >
          Not Approved
        </button>
      </div>

      {/* Comments Table */}
      <div className="relative w-full overflow-x-auto shadow rounded-lg bg-white">
        <table className="w-full text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
            <tr>
              <th className="px-4 py-4 text-left font-semibold">
                Blog Title & Comment
              </th>
              <th className="px-4 py-4 text-left font-semibold">Date</th>
              <th className="px-4 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComments && filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-b hover:bg-gray-50 transition-colors align-top"
                >
                  <td className="px-4 py-4">
                    <p className="text-gray-800">
                      <span className="font-semibold">Blog:</span>{' '}
                      {comment.blogTitle}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-semibold">Name:</span>{' '}
                      {comment.userName}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-semibold">Comment:</span>{' '}
                      {comment.text}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {comment.isApproved ? (
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                          Approved
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-200">
                          Not Approved
                        </button>
                      )}

                      <button className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-red-50">
                        <img
                          src={assets.trash_icon}
                          alt="Delete"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-400 text-sm"
                >
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
