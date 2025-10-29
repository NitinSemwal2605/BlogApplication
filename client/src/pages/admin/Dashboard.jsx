import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  // Fetch data from assets (local data source)
  const fetchDashboard = async () => {
    try {
      setDashboardData(dashboard_data)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className="flex-1 p-4 md:p-10 min-h-screen">
      {/* Top Summary Boxes */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center bg-white gap-4 p-4 min-w-56 rounded shadow">
          <img src={assets.dashboard_icon_1} alt="Blogs" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center bg-white gap-4 p-4 min-w-56 rounded shadow">
          <img src={assets.dashboard_icon_2} alt="Comments" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center bg-white gap-4 p-4 min-w-56 rounded shadow">
          <img src={assets.dashboard_icon_3} alt="Drafts" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Section */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
          <p className="font-medium">Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                <th scope="col" className="px-2 py-4">Blog Title</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs && dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400 text-sm">
                    No recent blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
