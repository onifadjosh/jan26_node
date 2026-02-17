const { name } = require("ejs");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  verified:{ type: Boolean, default: false },
//   lastLogin:
}, {timestamps:true, strict:"throw"});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
