/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
 */

import React, { useEffect, useState } from 'react'
import { assets, comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('approved') // 'approved' or 'notApproved'

  useEffect(() => {
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
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  assets={assets}
                />
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
