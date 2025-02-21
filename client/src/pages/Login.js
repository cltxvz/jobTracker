import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Wake up backend when login page loads
  useEffect(() => {
    axios.get("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/wakeup")
      .then(response => console.log("Backend woke up successfully!", response.data))
      .catch(error => console.error("Error waking up backend:", error));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h2>🔑 Login</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleLogin} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <a href="/forgot-password" className="text-decoration-none text-success">Forgot Password?</a>
        </div>
        <div className="mt-3 text-center">
          <p>Don't have an account? <a href="/register" className="text-decoration-none text-success">Sign up here</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
