const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const express = require("express");
const userRoute = require("./routes/user.routes");
const connectToDb = require("./db");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.render("home");
});

async function main() {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
}

main();
