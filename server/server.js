import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./dbConnect.js";
import loginRoutes from "./api/LoginRoutes.js";
import childRoutes from "./api/ChildRoutes.js";
import statsRoutes from "./api/StatRoutes.js";
import parentRoutes from "./api/ParentRoutes.js";
import kapatidRoutes from "./api/SiblingRoutes.js";
import familyRoutes from "./api/FamilyRoutes.js";
import backgroundRoutes from "./api/BackgroundRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

const currentFileUrl = new URL(import.meta.url);
const currentDir = path.dirname(fileURLToPath(currentFileUrl));
const __dirname = path.resolve(currentDir, "..");

// If you need the connection, just assign this function to a variable.
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//first open
app.get("/", (_req, res) => {
  console.log(port);
  //res.send("Hello world");
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Separate the routes to different files for easier management and debugging
app.use("/api", loginRoutes);
app.use("/api", childRoutes);
app.use("/api", parentRoutes);
app.use("/api", kapatidRoutes);
app.use("/api", familyRoutes);
app.use("/api", statsRoutes);
app.use("/api", backgroundRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
