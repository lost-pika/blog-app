const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const userRoute = require("./routes/user.routes");
const connectToDb = require("./db");
const cookirParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middleware/authentication.middleware")

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookirParser());

app.use(checkForAuthenticationCookie("token"))

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.use("/api/user", userRoute);

async function main() {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
}

main();
