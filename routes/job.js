const express = require("express");
const Job = require("../models/job"); // Import Job Schema

const router = express.Router();

router.post("/job-search", async (req, res) => {
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
            start,
            page,
        } = req.body;

        console.log("Received search data:", req.body);

        // Store job search query in MongoDB
        const newSearch = new Job({
            keyword,
            location,
            dateSincePosted,
            salary,
            experienceLevel,
            remoteFilter,
            jobType,
            sortBy,
            start,
            page
        });

        await newSearch.save(); // Save to database

        // Generate LinkedIn Job Search URL
        const baseUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?`;
        const params = new URLSearchParams();

        if (keyword) params.append("keywords", keyword);
        if (location) params.append("location", location);
        if (dateSincePosted) params.append("f_TPR", dateSincePosted);
        if (salary) params.append("f_SB2", salary);
        if (experienceLevel) params.append("f_E", experienceLevel);
        if (remoteFilter) params.append("f_WT", remoteFilter);
        if (jobType) params.append("f_JT", jobType);

        params.append("start", start + (page || 0));

        if (sortBy === "recent") params.append("sortBy", "DD");
        else if (sortBy === "relevant") params.append("sortBy", "R");

        const finalUrl = baseUrl + params.toString();

        res.status(200).json({ success: true, url: finalUrl, savedSearch: newSearch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
