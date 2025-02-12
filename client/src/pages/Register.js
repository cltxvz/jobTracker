import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h2>📝 Sign Up</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleRegister} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <div className="mt-3 text-center">
          <p>Already have an account? <a href="/login" className="text-decoration-none text-success">Login here</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
