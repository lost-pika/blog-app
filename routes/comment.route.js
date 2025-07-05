const {Router} = require("express");
const router = Router();
const {createComment} = require("../controllers/comment.conntroller")

router.post("/:blogId", createComment);

module.exports = router;