/*
 * Copyright (c) 2025 Yash Kushwaha
 * Licensed under the MIT License. See LICENSE file for details.
 */

import React from 'react'

const CommentTableItem = ({ comment, assets }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors align-top">
      <td className="px-4 py-4">
        <p className="text-gray-800">
          <span className="font-semibold">Blog:</span>{' '}
          {comment.blog?.title || 'No Title'}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-semibold">Name:</span> {comment.name}
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-semibold">Comment:</span> {comment.content}
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
              src={assets.cross_icon}
              alt="Delete"
              className="w-4 h-4 cursor-pointer"
            />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
