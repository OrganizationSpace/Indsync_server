const express = require("express");
const axios = require("axios");
const Job = require("../schema/job"); // Import Job Schema

const router = express.Router();

router.post("/job-search", async (req, res) => {
    console.log("Received search data:", req.body);

    try {
        const {
            keyword,
            location,
            dateSincePosted,
            salary,
            experienceLevel,
            remoteFilter,
            jobType,
            sortBy,
            start = 0,
            page = 0
        } = req.body;

        console.log("_____________________________________");

        // Store job search query in MongoDB
        const newSearch = new Job({
            keyword,
            location,
            dateSincePosted,
            salaryRanges: { start: salary }, // Ensure proper salary structure
            experienceLevel,
            remoteFilter: Boolean(remoteFilter), // Ensure boolean storage
            jobType,
            sortBy
        });

        await newSearch.save(); // Save to database
        console.log("Search saved to database:", newSearch);

        // Generate LinkedIn Job Search URL
        const baseUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?`;
        const params = new URLSearchParams();

        if (keyword) params.append("keywords", keyword);
        if (location) params.append("location", location);
        if (dateSincePosted) params.append("f_TPR", dateSincePosted);
        if (salary) params.append("f_SB2", salary);
        if (experienceLevel) params.append("f_E", experienceLevel);
        if (remoteFilter) params.append("f_WT", remoteFilter ? "1" : "0"); // LinkedIn uses 1/0 for boolean
        if (jobType) params.append("f_JT", jobType);

        params.append("start", Number(start) + Number(page || 0));
        if (sortBy === "recent") params.append("sortBy", "DD");
        else if (sortBy === "relevant") params.append("sortBy", "R");

        const finalUrl = baseUrl + params.toString();

        res.status(200).json({ success: true, url: finalUrl, savedSearch: newSearch });
    } catch (error) {
        console.error("Error processing job search:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get("/jobs", async (req, res) => {
    try {
      const linkedInUrl = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Software%20Engineer&location=India&geoId=102713980&f_TPR=r86400&f_E=mid&f_WT=1&f_JT=full_time&start=10&sortBy=DD";
      
      const response = await axios.get(linkedInUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9"
        }
      });
  
      res.send(response.data);
    } catch (error) {
      console.error("Error fetching LinkedIn jobs:", error.message);
      res.status(500).json({ error: "Failed to fetch job postings" });
    }
  });


module.exports = router;
