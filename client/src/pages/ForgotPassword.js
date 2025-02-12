import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/password/forgot-password", { email });
      setMessage(res.data.msg);
    } catch (error) {
      setMessage("Error sending reset link. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
