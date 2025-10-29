import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')
  const { axios } = useAppContext()

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message || 'Failed to fetch comments')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const filteredComments = comments.filter(comment =>
    filter === 'Approved' ? comment.isApproved : !comment.isApproved
  )

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 min-h-screen">
      <div className="flex justify-between items-center max-w-3xl mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
          Comments
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('Approved')}
            className={`border rounded-full px-4 py-1 text-sm transition-all ${
              filter === 'Approved'
                ? 'bg-white border-indigo-500 text-indigo-600 font-medium shadow-sm'
                : 'bg-transparent border-gray-300 text-gray-600'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`border rounded-full px-4 py-1 text-sm transition-all ${
              filter === 'Not Approved'
                ? 'bg-white border-indigo-500 text-indigo-600 font-medium shadow-sm'
                : 'bg-transparent border-gray-300 text-gray-600'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-w-3xl overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">
                Blog Title & Comment
              </th>
              <th className="px-6 py-3 text-left font-semibold max-sm:hidden">
                Date
              </th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-400 text-sm">
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
