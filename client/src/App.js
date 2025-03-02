import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/WelcomeHeader";
import Footer from "./components/Footer";

function App() {
  // Wake up backend on page load
  useEffect(() => {
    axios.get("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/wakeup");
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1 bg-light">
        <div className="container py-5">
        <h1 className="display-4 fw-bold">📋 Welcome to JobTracker!</h1>
          <p className="lead mt-5">
            <strong>Job hunting made simple – track, search, and stay organized in one place.</strong>
          </p>

          {/* 🌟 New Features Section */}
          <div className="row mt-5 text-start container-sm">
            <div className="col-md-4 bg-white p-4 shadow-sm rounded">
              <h4 className="text-primary">🔍 Job Search</h4>
              <p className="mt-3">
                Instantly find job listings from multiple sources and save them to your dashboard with one click.
              </p>
            </div>
            <div className="col-md-4 bg-white p-4 shadow-sm rounded">
              <h4 className="text-success">📅 Interactive Calendar</h4>
              <p className="mt-3">
                Organize and keep track of all your deadlines to ensure you never miss out.
              </p>
            </div>
            <div className="col-md-4 bg-white p-4 shadow-sm rounded">
              <h4 className="text-warning">✅ Stay Organized</h4>
              <p className="mt-3">
                Securely store job links, portal accounts, and progress. Never lose track of an opportunity again.
              </p>
            </div>
          </div>

          {/* 🚀 Problem vs. Solution Section */}
          <div className="row mt-5 text-start container-sm">
            <div className="col-md-6 bg-white p-4 shadow-sm rounded">
              <h4 className="text-danger">🚨 The Problem</h4>
              <ul className="list-unstyled mt-3">
                <li>❌ Multiple job portals, each requiring an account.</li> 
                <li>❌ Forgetting where you've applied.</li>
                <li>❌ Losing track of deadlines & interviews.</li>
                <li>❌ No central place to manage job applications.</li>
              </ul>
            </div>
            <div className="col-md-6 bg-white p-4 shadow-sm rounded">
              <h4 className="text-success">✅ The Solution</h4>
              <ul className="list-unstyled mt-3">
                <li>✔️ Find jobs instantly with our built-in job search.</li>
                <li>✔️ Save & track applications in your personalized dashboard.</li>
                <li>✔️ Use the calendar to plan interviews & deadlines.</li>
                <li>✔️ Stay organized with an all-in-one job tracker.</li>
              </ul>
            </div>
          </div>

          {/* 🚀 Call to Action Buttons */}
          <div className="mt-5">
            <Link to="/login">
              <button className="btn btn-primary btn-lg mx-2">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-success btn-lg mx-2">Register</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
