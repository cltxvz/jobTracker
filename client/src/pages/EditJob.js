import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5001/api/jobs", {
          headers: { "x-auth-token": token },
        });
        const foundJob = res.data.find((j) => j._id === id);
        setJob(foundJob);
      } catch (error) {
        console.error(error);
        navigate("/dashboard");
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/jobs/${id}`, job, {
        headers: { "x-auth-token": token },
      });
      alert("Job updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update job");
    }
  };

  return job ? (
    <div className="container mt-5">
      <h2>✏️ Edit Job</h2>
      <form onSubmit={handleUpdateJob} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input type="text" className="form-control" value={job.company} onChange={(e) => setJob({ ...job, company: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Job Position</label>
          <input type="text" className="form-control" value={job.position} onChange={(e) => setJob({ ...job, position: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Job Link</label>
          <input type="url" className="form-control" value={job.jobLink} onChange={(e) => setJob({ ...job, jobLink: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Portal Link</label>
          <input type="url" className="form-control" value={job.portalLink} onChange={(e) => setJob({ ...job, portalLink: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={job.username} onChange={(e) => setJob({ ...job, username: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={job.password} onChange={(e) => setJob({ ...job, password: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Application Status</label>
          <select className="form-select" value={job.status} onChange={(e) => setJob({ ...job, status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="Applied">Applied</option>
            <option value="Assessment Pending">Assessment Pending</option>
            <option value="Assessment Completed">Assessment Completed</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Update Job</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/dashboard")}>Back</button>
      </form>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default EditJob;
