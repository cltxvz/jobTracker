const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// API Keys from environment variables
const SERPAPI_KEY = process.env.SERPAPI_KEY;
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

// Helper function to fetch jobs from SERPAPI (Google Jobs)
const fetchGoogleJobs = async (query, location, googleJobsNextPageToken = null) => {
  try {
    const params = {
      engine: "google_jobs",
      q: query,
      api_key: SERPAPI_KEY,
    };

    // Conditionally add location parameter only if it's not blank
    if (location && location.trim() !== "") {
      params.location = location.trim(); // Use trim to remove leading/trailing whitespace
    }

    if (googleJobsNextPageToken) {
      params.next_page_token = googleJobsNextPageToken; // Use the next_page_token for pagination
    }

    const response = await axios.get(`https://serpapi.com/search.json`, { params });

    if (response.data.error) {
      // console.warn("Google Jobs API limit reached or other SerpAPI error:", response.data.error);
      return { jobs: [], error: `Google Jobs API Error: ${response.data.error}`, googleNextToken: null };
    }

    if (!response.data.jobs_results) {
      // console.warn("SerpAPI did not return jobs_results. Full response data:", JSON.stringify(response.data, null, 2));
      return { jobs: [], error: "No jobs results from Google Jobs API.", googleNextToken: null };
    }

    const jobs = response.data.jobs_results.map((job) => {
      const jobLink =
        job.apply_options && job.apply_options.length > 0
          ? job.apply_options[0].link
          : `https://www.google.com/search?q=${encodeURIComponent(job.title)} job`;

      return {
        source: "Google Jobs",
        title: job.title,
        company: job.company_name || "Unknown",
        location: job.location || "Remote",
        type: job.detected_extensions?.schedule_type || "N/A",
        link: jobLink,
      };
    });

    const googleNextToken = response.data.serpapi_pagination?.next_page_token || null;
    // console.log(`[fetchGoogleJobs] - Google Next Page Token received: ${googleNextToken}`);

    return { jobs, googleNextToken };
  } catch (error) {
    console.error("Google Jobs API Error:", error.message, error.response?.data);
    return { jobs: [], error: `Google Jobs API Error: ${error.message}`, googleNextToken: null };
  }
};

// Helper function to fetch jobs from Adzuna (remains page-based)
const fetchAdzunaJobs = async (query, location, page = 1, job_type = "") => {
  try {
    const params = {
      app_id: ADZUNA_APP_ID,
      app_key: ADZUNA_APP_KEY,
      what: query,
    };

    // Conditionally add 'where' (location) parameter only if it's not blank
    if (location && location.trim() !== "") {
      params.where = location.trim(); // Use trim to remove leading/trailing whitespace
    }

    // Map frontend job_type values to Adzuna's expected parameters
    if (job_type === "fulltime") {
      params.full_time = "1";
    } else if (job_type === "parttime") {
      params.part_time = "1";
    } else if (job_type === "contract") {
      params.contract = "1";
    } else if (job_type === "internship") {
      params.apprenticeship = "1";
    }

    const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/${page}`, {
      params,
    });

    if (response.data.error) {
      // console.warn("Adzuna API limit reached or other Adzuna error.");
      return { jobs: [], error: "Adzuna API Limit Reached", adzunaTotalPages: 0 };
    }

    if (!response.data.results) {
      // console.warn("Adzuna API did not return results.");
      return { jobs: [], error: "No jobs results from Adzuna API.", adzunaTotalPages: 0 };
    }

    const jobs = response.data.results.map((job) => ({
      source: "Adzuna",
      title: job.title,
      company: job.company?.display_name || "Unknown",
      location: job.location?.display_name || "Remote",
      type: job.contract_type || "N/A",
      link: job.redirect_url || "#",
    }));

    const ADZUNA_RESULTS_PER_PAGE = 50;
    const adzunaTotalCount = response.data.count || 0;
    const adzunaTotalPages = Math.ceil(adzunaTotalCount / ADZUNA_RESULTS_PER_PAGE);
    // console.log(`[fetchAdzunaJobs] - Adzuna Total Results: ${adzunaTotalCount}, Calculated Total Pages: ${adzunaTotalPages}`);

    return { jobs, adzunaTotalPages };
  } catch (error) {
    console.error("Adzuna API Error:", error.message, error.response?.data);
    return { jobs: [], error: `Adzuna API Error: ${error.message}`, adzunaTotalPages: 0 };
  }
};


// Job Search API Endpoint
router.get("/", async (req, res) => {
  const { query, location, job_type, adzunaPage = 1, googleJobsNextPageToken = null } = req.query;

  let currentAdzunaPage = parseInt(adzunaPage, 10);
  if (isNaN(currentAdzunaPage) || currentAdzunaPage < 1) {
    // console.warn(`Invalid Adzuna page number received: ${adzunaPage}. Defaulting to 1.`);
    currentAdzunaPage = 1;
  }

  // console.log(`[jobSearchRoutes] - Backend received Adzuna page: ${currentAdzunaPage}`);
  // console.log(`[jobSearchRoutes] - Backend received Google Jobs Token: ${googleJobsNextPageToken}`);
  // console.log(`[jobSearchRoutes] - Search query: "${query}", Location: "${location}", Job Type: "${job_type}"`);

  // Fetch jobs from both APIs
  const googleJobsResponse = await fetchGoogleJobs(query, location, googleJobsNextPageToken);
  const adzunaJobsResponse = await fetchAdzunaJobs(query, location, currentAdzunaPage, job_type);

  // Handle errors
  const errors = [];
  if (googleJobsResponse.error) errors.push(googleJobsResponse.error);
  if (adzunaJobsResponse.error) errors.push(adzunaJobsResponse.error);

  // Combine jobs
  const combinedJobs = [...googleJobsResponse.jobs, ...adzunaJobsResponse.jobs];

  // Determine pagination states for the frontend
  const nextAdzunaPage = currentAdzunaPage + 1;
  const hasMoreAdzuna = nextAdzunaPage <= adzunaJobsResponse.adzunaTotalPages;

  const hasMoreGoogleJobs = !!googleJobsResponse.googleNextToken;

  const responseData = {
    jobs: combinedJobs,
    errors: errors.length ? errors : null,
    googleJobsNextPageToken: googleJobsResponse.googleNextToken,
    adzunaNextPage: nextAdzunaPage,
    hasMoreJobs: hasMoreAdzuna || hasMoreGoogleJobs
  };

  // console.log("Backend response to frontend:", JSON.stringify(responseData, null, 2));

  // Send response
  res.json(responseData);
});

module.exports = router;