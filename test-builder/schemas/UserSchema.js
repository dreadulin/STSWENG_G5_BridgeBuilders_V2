import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);
export default mongoose.models.User || User;
