const {Router} = require("express");
const {signup} = require("../controllers/user.controller");
const {signin} = require("../controllers/user.controller");

const router = Router();

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.post('/signup', signup);

router.post('/signin', signin);

module.exports = router;