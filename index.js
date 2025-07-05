const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.route");
const connectToDb = require("./db");
const cookirParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middleware/authentication.middleware")
const Blog = require("./models/blog.model");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookirParser());
app.use(express.static(path.resolve('./public'))) // public folder ke ander jo bhi hai usko statically serve kardo

app.use(checkForAuthenticationCookie("token"))

app.get("/", async (req, res) => {
  const allblogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allblogs
  });
});

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

async function main() {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
}

main();
