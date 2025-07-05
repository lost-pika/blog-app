const {Router} = require("express");
const {upload} = require("../middleware/upload.middleware");
const {createBlog} = require("../controllers/blog.controller")

const router = Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    })
});

router.post("/", upload.single("coverImage"), createBlog, (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")
})

module.exports = router;