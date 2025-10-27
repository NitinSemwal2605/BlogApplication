
import express from 'express'
import { addBlog } from '../controllers/blogController.js'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'
import {
    getAllBlogs,
    getBlogById,
    deleteBlogById,
    togglePublish,
    addComment,
    getBlogComments
} from '../controllers/blogController.js'

const blogRouter = express.Router()


blogRouter.post("/add", upload.single('image'), auth, addBlog)
blogRouter.get("/all", getAllBlogs)
blogRouter.get("/:blogId", getBlogById)
blogRouter.post("/delete", auth, deleteBlogById)
blogRouter.post("/toggle-publish", auth, togglePublish)

blogRouter.post("/add-comment", addComment)
blogRouter.post("/comments", getBlogComments)


export default blogRouter