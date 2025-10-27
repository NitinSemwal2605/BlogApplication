import React from 'react'
import { assets } from '../../assets/assets'

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog
  const BlogDate = new Date(createdAt)

  return (
    <tr className="border-y border-gray-200">
      <th className="px-2 py-4 text-gray-700">{index}</th>
      <td className="px-2 py-4 text-gray-700">{title}</td>
      <td className="px-2 py-4 max-sm:hidden text-gray-500">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`font-medium ${
            isPublished ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>

      <td className="px-2 py-4">
        <div className="flex gap-2 items-center">
          {/* Edit Button */}
          <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
            Edit
          </button>

          {/* Publish/Unpublish Toggle */}
          {isPublished ? (
            <button className="px-2 py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded">
              Unpublish
            </button>
          ) : (
            <button className="px-2 py-1 text-xs bg-green-500 text-white rounded">
              Publish
            </button>
          )}

          {/* Delete Button */}
          <button className="px-2 py-1 text-xs bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BlogTableItem
