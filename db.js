const mongoose = require("mongoose");

connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected!");
  } catch (error) {
    console.log("mongodb connection error", error);
  }
};

module.exports = connectToDb;
