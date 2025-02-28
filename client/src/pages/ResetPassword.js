import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/password/reset-password/${token}`, { newPassword });
      setMessage(res.data.msg);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMessage("Error resetting password. Try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="fw-bold text-center">🔒 Reset Password</h2>
            <p className="text-muted text-center">Enter your new password below.</p>

            {message && <div className="alert alert-info text-center">{message}</div>}

            <form onSubmit={handleReset} className="mt-4">
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-lg w-100" style={{ backgroundColor: "#198754", color: "#fff" }}>
                Reset Password
              </button>
            </form>

            <div className="mt-3 text-center">
              <a href="/login" className="text-decoration-none text-success">← Back to Login</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
