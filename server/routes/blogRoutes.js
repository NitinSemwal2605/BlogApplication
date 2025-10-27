
import express from 'express'
import { addBlog } from '../controllers/blogController.js'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'

const blogRouter = express.Router()


blogRouter.post("/add", upload.single('image'), auth, addBlog)

export default blogRouter