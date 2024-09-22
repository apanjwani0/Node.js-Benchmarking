const mongoose = require("mongoose");

const connectDB = async (uri, clientOptions) => {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
