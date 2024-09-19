import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// We use environment variables to keep the MongoDB URL link private
const dbUri = process.env.MONGODB_URI;

const connectDB = () => {
  try {
    const conn = mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
    return conn;
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
