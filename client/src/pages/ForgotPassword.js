import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous message
    setError(false);

    try {
      const res = await axios.post("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/password/forgot-password", { email });
      setMessage(res.data.msg);
    } catch (error) {
      setMessage("Error sending reset link. Please try again.");
      setError(true);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="fw-bold text-center">🔑 Forgot Your Password?</h2>

            {message && (
              <div className={`alert ${error ? "alert-danger" : "alert-dark"} text-center`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-lg w-100" style={{ backgroundColor: "#198754", color: "#fff" }}>
                Send Reset Link
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

export default ForgotPassword;
