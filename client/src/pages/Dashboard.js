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

  return (
    <div>
      <h2>My Job Applications</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.company} - {job.position} ({job.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
