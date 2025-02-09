import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5001/api/jobs`, {
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
    <div>
      <h2>Edit Job</h2>
      <form onSubmit={handleUpdateJob}>
        <input type="text" value={job.company} onChange={(e) => setJob({ ...job, company: e.target.value })} required />
        <input type="text" value={job.position} onChange={(e) => setJob({ ...job, position: e.target.value })} required />
        <select value={job.status} onChange={(e) => setJob({ ...job, status: e.target.value })}>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="submit">Update Job</button>
      </form>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

export default EditJob;
