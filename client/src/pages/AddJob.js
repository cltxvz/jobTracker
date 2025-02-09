import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddJob() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [portalLink, setPortalLink] = useState("");
  const [status, setStatus] = useState("Applied");

  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/jobs",
        { company, position, jobLink, portalLink, status },
        { headers: { "x-auth-token": token } }
      );
      alert("Job added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to add job");
    }
  };

  return (
    <div className="container mt-5">
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
          <label className="form-label">Application Status</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/dashboard")}>Back</button>
      </form>
    </div>
  );
}

export default AddJob;
