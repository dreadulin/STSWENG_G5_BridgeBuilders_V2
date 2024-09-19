import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../schemas/UserSchema.js";
import authenticateToken from "../middleware/authenticateToken.js";

const apiRouter = express.Router();

// sign up endpoint
apiRouter.post("/signup", async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    if (!username || !password || !userType) {
      return res.status(400).json({
        error: "Please provide username, password, and userType",
      });
    }

    const validUserTypes = ["community", "homeCare", "superUser"];
    if (!validUserTypes.includes(userType)) {
      return res.status(400).json({ error: "Invalid userType" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      userType,
    });

    await user.save();
    console.log(`User created: ${username}`);
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    console.error("Error creating user:", e);
    if (e.code === 11000) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Internal server error", details: e.message });
    }
  }
});

//login endpoint
apiRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("Login attempt for user:", username);
    if (!user) {
      console.log("User not found");
      return res.status(500).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );
    
    res.status(200).json({ message: "Login successful", token});
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get current user's info
apiRouter.get("/current-user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "username userType"); 
    console.log("Fetched User:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get account info (admin endpoint)
apiRouter.get("/accounts", async (req, res) => {
  try {
    const accounts = await User.find({}, "username userType");
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to reset password
apiRouter.post("/reset-password", async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ username }, { password: hashedPassword });
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default apiRouter;
