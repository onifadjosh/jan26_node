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
//   lastLogin:
}, {timestamps:true});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
