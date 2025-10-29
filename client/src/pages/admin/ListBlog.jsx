import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const BlogList = () => {
  const { axios } = useAppContext()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  // 🟢 Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      const response = await axios.get('/api/blog/all', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data.success) {
        setBlogs(response.data.blogs)
      } else {
        toast.error(response.data.message || 'Failed to load blogs')
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('Error fetching blogs')
    } finally {
      setLoading(false)
    }
  }

  // 🟢 Toggle publish/unpublish
  const togglePublishStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.patch(
        `/api/blog/status/${id}`,
        { isPublished: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        toast.success(
          `Blog ${!currentStatus ? 'published' : 'unpublished'} successfully!`
        )
        fetchBlogs() // Refresh list
      } else {
        toast.error(response.data.message || 'Failed to update blog')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Error updating blog status')
    }
  }

  // 🟢 Delete blog
  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.data.success) {
        toast.success('Blog deleted successfully!')
        fetchBlogs()
      } else {
        toast.error(response.data.message || 'Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Error deleting blog')
    }
  }

  useEffect(() => {
    fetchBlogs()
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
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 text-sm"
                >
                  Loading blogs...
                </td>
              </tr>
            ) : blogs.length > 0 ? (
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
                          blog.isPublished ? 'text-green-600' : 'text-red-500'
                        }`}
                      >
                        {blog.isPublished ? 'Published' : 'Unpublished'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            togglePublishStatus(blog._id, blog.isPublished)
                          }
                          className={`px-3 py-1 text-xs rounded cursor cursor-pointer ${
                            blog.isPublished
                              ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {blog.isPublished ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 hover:bg-red-100"
                        >
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
