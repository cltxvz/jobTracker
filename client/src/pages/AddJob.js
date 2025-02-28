import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

function AddJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [portalLink, setPortalLink] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Applied");

  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/jobs",
        { company, position, jobLink, portalLink, username, password, status },
        { headers: { "x-auth-token": token } }
      );

      // Store toast message for Dashboard to handle
      localStorage.setItem("toastMessage", "Job added successfully!");
      localStorage.setItem("toastType", "success");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <PageHeader />
      <div className="container mt-5 flex-grow-1">
        <h2>➕ Add a New Job</h2>
        <form onSubmit={handleAddJob} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Position</label>
            <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Job Link</label>
            <input type="url" className="form-control" value={jobLink} onChange={(e) => setJobLink(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Portal Link</label>
            <input type="url" className="form-control" value={portalLink} onChange={(e) => setPortalLink(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Application Status</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Applied">Applied</option>
              <option value="Assessment Pending">Assessment Pending</option>
              <option value="Assessment Completed">Assessment Completed</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="d-flex gap-2 mb-4">
            <button type="submit" className="btn btn-success">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>Back</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddJob;
