import fs from 'fs'
import imagekit from '../config/imageKit.js'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

// 🟢 Add Blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
    const imageFile = req.file

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: 'Missing required fields' })
    }

    const fileBuffer = fs.readFileSync(imageFile.path)

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blog'
    })

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '1280' }
      ]
    })

    const image = optimizedImageUrl

    await Blog.create({ title, subTitle, description, category, image, isPublished })

    res.json({ success: true, message: 'Blog added successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// 🟢 Get All Blogs (only published)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.json({ success: true, blogs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// 🟢 Get Blog By ID
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params
    const blog = await Blog.findById(blogId)
    if (!blog) return res.json({ success: false, message: 'Blog not found' })
    res.json({ success: true, blog })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// 🟢 Delete Blog
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)
    await Comment.deleteMany({ blog: id })
    res.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// 🟢 Toggle Publish
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params
    const { isPublished } = req.body

    const blog = await Blog.findById(id)
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })

    blog.isPublished = isPublished
    await blog.save()

    res.json({ success: true, message: 'Blog status updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    // ✅ Validate
    if (!blogId || !name || !content) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // ✅ Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    // ✅ Create new comment (set isApproved = false by default)
    const newComment = new Comment({
      blog: blogId,
      name,
      content,
      isApproved: false,
    });

    await newComment.save();

    res.json({
      success: true,
      message: "Comment added successfully and awaiting approval",
      comment: newComment,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 Get Approved Comments for a Blog
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
