import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // DELETE Job Function
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

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>📋 My Job Applications</h2>
        <button className="btn btn-danger" onClick={handleLogout}>🚪 Logout</button>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/add-job")}>➕ Add New Job</button>

      {jobs.length > 0 ? (
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Status</th>
              <th>Job Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>
                  <span className={`badge bg-${job.status === "Rejected" ? "danger" : job.status === "Offer" ? "success" : "primary"}`}>
                    {job.status}
                  </span>
                </td>
                <td>
                  {job.jobLink ? (
                    <a href={job.jobLink} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm">
                      View Job
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/edit-job/${job._id}`)}>✏️ Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning mt-4">No job applications found.</div>
      )}
    </div>
  );
}

export default Dashboard;
