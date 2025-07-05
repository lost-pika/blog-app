const {Router} = require("express");
const {upload} = require("../middleware/upload.middleware");
const {createBlog} = require("../controllers/blog.controller");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    // console.log("blog", blog);
    const comments = await Comment.find({
        blogId: req.params.id
    }).populate("createdBy");
    
    console.log("comments", comments)
    
    return res.render('blog', {
        user: req.user,
        blog,
        comments
    })
})

router.post("/", upload.single("coverImage"), createBlog, (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")
})

module.exports = router;