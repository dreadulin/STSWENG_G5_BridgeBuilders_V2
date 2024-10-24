import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import loginRoutes from "./api/LoginRoutes.js";
import childRoutes from "./api/ChildRoutes.js";
import statsRoutes from "./api/StatRoutes.js";
import motherRoutes from "./api/MotherRoutes.js";
import fatherRoutes from "./api/FatherRoutes.js";
import parentRoutes from "./api/ParentRoutes.js";
import kapatidRoutes from "./api/SiblingRoutes.js";
import familyRoutes from "./api/FamilyRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Get current directory path
const currentFileUrl = new URL(import.meta.url);
const currentDir = path.dirname(fileURLToPath(currentFileUrl));
const __dirname = path.resolve(currentDir, "..");

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "dist")));

// API Routes
app.use("/api", loginRoutes);
app.use("/api", childRoutes);
app.use("/api", fatherRoutes);
app.use("/api", motherRoutes);
app.use("/api", parentRoutes);
app.use("/api", kapatidRoutes);
app.use("/api", familyRoutes);
app.use("/api", statsRoutes);

// Serve React frontend for all non-API routes (catch-all)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
