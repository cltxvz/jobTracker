const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String }, // Stores the password reset token
    resetTokenExpiry: { type: Date }, // Expiry time for the token
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
