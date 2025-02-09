import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/jobs", {
          headers: { "x-auth-token": token },
        });
        setJobs(res.data);
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/jobs/${id}`, {
        headers: { "x-auth-token": token },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  return (
    <div>
      <h2>My Job Applications</h2>
      <button onClick={() => navigate("/add-job")}>➕ Add New Job</button>

      {jobs.length === 0 ? (
        <p>No job applications found. Start adding jobs!</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Job Link</th>
              <th>Portal Link</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>
                  {job.jobLink ? (
                    <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
                      Job Post
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  {job.portalLink ? (
                    <a href={job.portalLink} target="_blank" rel="noopener noreferrer">
                      Portal
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{job.status}</td>
                <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/edit-job/${job._id}`)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(job._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
