import express from 'express'
import upload from '../middlewares/multer.js'
import auth from '../middlewares/auth.js'
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments
} from '../controllers/blogController.js'

const blogRouter = express.Router()

// 🟢 BLOG MANAGEMENT ROUTES
// Admin adds blog (protected)
blogRouter.post('/add', upload.single('image'), auth, addBlog)

// Public — Get all published blogs
blogRouter.get('/all', getAllBlogs)

// Public — Get single blog by ID
blogRouter.get('/:blogId', getBlogById)

// Admin — Delete blog (also deletes its comments)
blogRouter.delete('/:id', auth, deleteBlogById)

// Admin — Toggle publish status
blogRouter.patch('/status/:id', auth, togglePublish)


// 🟢 COMMENT ROUTES
// Public — Add comment to a specific blog
blogRouter.post('/add-comment', addComment)

// Public — Get approved comments of a specific blog
blogRouter.get('/:blogId/comments', getBlogComments)

export default blogRouter
