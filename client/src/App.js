import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/WelcomeHeader";
import Footer from "./components/Footer";

function App() {
  // Wake up backend on page load
  useEffect(() => {
    axios.get("https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/wakeup")
      .then(response => console.log("Backend woke up successfully!", response.data))
      .catch(error => console.error("Error waking up backend:", error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1 bg-light">
        <div className="container py-5">

          <h1 className="display-4 fw-bold">📋 Welcome to JobTracker!</h1>
          <p className="lead mt-5">
            <strong>Tired of losing track of your job applications? We've got you covered!</strong>
          </p>

          {/* Problem vs. Solution Section */}
          <div className="row mt-5 text-start container-sm">
            <div className="col-md-6 bg-white p-4 shadow-sm rounded">
              <h4 className="text-danger">🚨 The Problem</h4>
              <ul className="list-unstyled mt-3">
                <li>❌ Multiple job portals, each requiring an account.</li>
                <li>❌ Forgetting login credentials & having to reset them.</li>
                <li>❌ Losing track of job application links.</li>
                <li>❌ No easy way to track application progress.</li>
              </ul>
            </div>
            <div className="col-md-6 bg-white p-4 shadow-sm rounded">
              <h4 className="text-success">✅ The Solution</h4>
              <ul className="list-unstyled mt-3">
                <li>✔️ One place to track all applications.</li>
                <li>✔️ Securely store login credentials.</li>
                <li>✔️ Easily access job portal links</li>
                <li>✔️ Sort & filter applications by status, company, & date.</li>
              </ul>
            </div>
          </div>

          {/* Call to Action Buttons */}
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
