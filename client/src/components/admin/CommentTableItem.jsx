import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CommentTableItem = ({ comment, fetchComments }) => {
  const token = localStorage.getItem('token')

  const handleApprove = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/approve-comment`,
        { commentId: comment._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        toast.success('✅ Comment Approved')
        fetchComments()
      } else {
        toast.error(res.data.message || 'Failed to approve comment')
      }
    } catch (err) {
      console.error('Approval error:', err)
      toast.error(err.response?.data?.message || 'Error approving comment')
    }
  }

  const handleDelete = async () => {
  if (!window.confirm('⚠️ Are you sure you want to delete this comment?')) return
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/delete-comment`,
      { commentId: comment._id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.data.success) {
      toast.success('🗑️ Comment Deleted')
      fetchComments()
    } else {
      toast.error(res.data.message || 'Failed to delete comment')
    }
  } catch (err) {
    console.error('Delete error:', err)
    toast.error(err.response?.data?.message || 'Error deleting comment')
  }
}


  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <p className="font-medium text-gray-800">
          {comment.blog?.title || 'Unknown Blog'}
        </p>
        <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
      </td>

      <td className="px-6 py-4 text-gray-500 text-sm">
        {new Date(comment.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4 flex items-center gap-2">
        {!comment.isApproved && (
          <button
            onClick={handleApprove}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
          >
            Approve
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default CommentTableItem
