const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTokenForUser } = require("../services/authentication.services");
const { validateToken } = require("../services/authentication.services");

const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).render("signup", {error: "Email already in use" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.redirect("/");
  } catch (error) {
    console.log("signup error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).render("signin", {error: "Invalid email or password"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render("signin", {error: "Invalid email or password"});
    }

    const token = createTokenForUser(user);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log("signin error:", error);
    return res.status(500).render("signin", {
      error: "Internal server error",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").redirect("/");
}

module.exports = {
  signup,
  signin,
  logout
};
