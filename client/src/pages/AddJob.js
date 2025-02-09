import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const res = await axios.post(
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
    <div>
      <h2>Add a New Job</h2>
      <form onSubmit={handleAddJob}>
        <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
        <input type="text" placeholder="Job Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
        <input type="url" placeholder="Job Link" value={jobLink} onChange={(e) => setJobLink(e.target.value)} />
        <input type="url" placeholder="Portal Link" value={portalLink} onChange={(e) => setPortalLink(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="submit">Add Job</button>
      </form>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default AddJob;
