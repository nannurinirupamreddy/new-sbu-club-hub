const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.log("Error in connecting to db", error);
  }
}

module.exports = connectDB;
