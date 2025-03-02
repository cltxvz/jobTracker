import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchHeader from "../components/SearchHeader";
import Footer from "../components/Footer";

const API_BASE_URL = "https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/jobs-search";
const JOB_SAVE_URL = "https://jobtracker-backend-e1b2897187d2.herokuapp.com/api/jobs";

function JobSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // Fetch Jobs from Backend
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a job title to search.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}`, {
        params: { query, location, job_type: jobType, page: 1 },
        headers: token ? { "x-auth-token": token } : {},
      });

      setJobs(res.data.jobs);
      setError(res.data.errors ? res.data.errors.join(" | ") : "");
      setPage(2);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs. Please try again.");
    }

    setLoading(false);
  };

  // Load More Jobs
  const handleLoadMore = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_BASE_URL}`, {
        params: { query, location, job_type: jobType, page },
      });

      setJobs([...jobs, ...res.data.jobs]);
      setError(res.data.errors ? res.data.errors.join(" | ") : "");
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching more jobs:", error);
      setError("Failed to load more jobs.");
    }

    setLoading(false);
  };

  // Save Job to Dashboard
  const handleSaveJob = async (job) => {
    if (!job.link || job.link === "#") { 
      setToastMessage("Error: No job link available.");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      await axios.post(JOB_SAVE_URL, {
        company: job.company || "Unknown",
        position: job.title,
        jobLink: job.link, // Ensure job link is stored correctly
        status: "Pending",
      }, {
        headers: { "x-auth-token": token },
      });
  
      setToastMessage("Job added successfully!");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (error) {
      console.error("Error saving job:", error);
      setToastMessage("Failed to save job.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <SearchHeader />
      <div className="container mt-5 flex-grow-1">

        {/* Back Button */}
        <div className="text-center mb-5">
          <button className="btn btn-light border-dark" onClick={() => navigate("/dashboard")}>🔙 Back to Dashboard</button>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-warning">{error}</div>}

        {/* Search Form */}
        <form className="mb-4" onSubmit={handleSearch}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Job title (e.g., Software Engineer)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Location (e.g., New York, Remote)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="">Any Job Type</option>
                <option value="fulltime">Full-Time</option>
                <option value="parttime">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-success w-100">🔍</button>
            </div>
          </div>
        </form>

        {/* Loading Indicator */}
        {loading && <div className="text-center mt-3"><strong>Loading jobs...</strong></div>}

        {/* Job Listings */}
        <div className="row mt-4">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company || "Unknown Company"}</h6>
                    <p className="card-text">
                      📍 <strong>{job.location || "Not specified"}</strong><br />
                      🏢 <strong>{job.type || "Unknown type"}</strong> | 🔗 <strong>{job.source || "N/A"}</strong>
                    </p>
                    <div className="d-flex gap-2">
                    <a
                        href={job.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${job.link && job.link !== "#" ? "btn-primary" : "btn-secondary disabled"}`}
                        >
                        View Job Post
                    </a>
                      <button className="btn btn-success" onClick={() => handleSaveJob(job)}>
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <div className="text-center mt-3"><strong>No jobs found. Try a different search.</strong></div>
          )}
        </div>

        {/* Load More Results */}
        {jobs.length > 0 && (
          <div className="text-center mt-4">
            <button
              className="btn btn-success"
              onClick={handleLoadMore}
              disabled={loading}
              style={{ backgroundColor: loading ? "#ccc" : "#28a745", cursor: loading ? "not-allowed" : "pointer", marginBottom:"50px" }}
            >
              {loading ? "Loading..." : "Load More Results"}
            </button>
          </div>
        )}

        
      </div>
      <Footer />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: "5px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            fontSize: "16px",
            zIndex: 1000,
            transition: "opacity 0.5s ease-in-out",
            opacity: 1,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default JobSearch;
