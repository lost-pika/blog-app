const Comment = require("../models/comment.model")

const createComment = async (req, res) => {
    const {content} = req.body;

    try {
        await Comment.create({
            content,
            blogId : req.params.blogId,
            createdBy: req.user.id,
        })

        return res.redirect(`/api/blog/${req.params.blogId}`)

    } catch (error) {
        
    }
}

module.exports = {
    createComment
}