const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// API Keys from environment variables
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

// Helper function to fetch jobs from SERPAPI (Google Jobs)
const fetchGoogleJobs = async (query, location) => {
    try {
      const response = await axios.get(`https://serpapi.com/search.json`, {
        params: {
          engine: "google_jobs",
          q: query,
          location: location,
          api_key: SERPAPI_KEY,
        },
      });
  
      if (response.data.error) {
        console.warn("Google Jobs API limit reached.");
        return { jobs: [], error: "Google Jobs API Limit Reached" };
      }
  
      const jobs = response.data.jobs_results.map((job) => {
        // Get the first valid apply link from `apply_options`
        const jobLink =
          job.apply_options && job.apply_options.length > 0
            ? job.apply_options[0].link // Select the first apply link
            : `https://www.google.com/search?q=${encodeURIComponent(job.title)}`;
  
        return {
          source: "Google Jobs",
          title: job.title,
          company: job.company_name || "Unknown",
          location: job.location || "Remote",
          type: job.detected_extensions?.schedule_type || "N/A",
          link: jobLink,
        };
      });
  
      return { jobs };
    } catch (error) {
      console.error("Google Jobs API Error:", error.message);
      return { jobs: [], error: "Google Jobs API Error" };
    }
  };
  

// Helper function to fetch jobs from Adzuna
const fetchAdzunaJobs = async (query, location, page = 1, job_type = "") => {
    try {
      const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/${page}`, {
        params: {
          app_id: ADZUNA_APP_ID,
          app_key: ADZUNA_APP_KEY,
          what: query,
          where: location,
          full_time: job_type === "fulltime" ? "1" : "",
          part_time: job_type === "parttime" ? "1" : "",
        },
      });
  
      if (response.data.error) {
        console.warn("Adzuna API limit reached.");
        return { jobs: [], error: "Adzuna API Limit Reached" };
      }
  
      const jobs = response.data.results.map((job) => ({
        source: "Adzuna",
        title: job.title,
        company: job.company?.display_name || "Unknown",
        location: job.location?.display_name || "Remote",
        type: job.contract_type || "N/A",
        link: job.redirect_url || "#", // Ensure correct job link is used
      }));
  
      return { jobs };
    } catch (error) {
      console.error("Adzuna API Error:", error.message);
      return { jobs: [], error: "Adzuna API Error" };
    }
  };
  

// Job Search API Endpoint
router.get("/", async (req, res) => {
  const { query, location, job_type, page = 1 } = req.query;

  // Fetch jobs from both APIs
  const googleJobs = await fetchGoogleJobs(query, location);
  const adzunaJobs = await fetchAdzunaJobs(query, location, page, job_type);

  // Handle errors
  const errors = [];
  if (googleJobs.error) errors.push(googleJobs.error);
  if (adzunaJobs.error) errors.push(adzunaJobs.error);

  // Send response
  res.json({
    jobs: [...googleJobs.jobs, ...adzunaJobs.jobs],
    errors: errors.length ? errors : null,
  });
});

module.exports = router;
