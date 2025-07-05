const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  const { title, body } = req.body;

  try {
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user.id,
      coverImageUrl: `/uploads/${req.file.filename}`,
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {}
};

module.exports = {
  createBlog,
};
