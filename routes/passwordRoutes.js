const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();

// FORGOT PASSWORD - Send Reset Email
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User with this email does not exist." });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Use 465 for SSL
      secure: true, // Force SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate issues
      },
    }); 

    // Use `resetToken` instead of `token`
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// RESET PASSWORD - Update Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ msg: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
