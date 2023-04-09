const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const UserSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  isDeleted: { type: Boolean, required: false }
});

export const UserModel = mongoose.model("User", UserSchema);
