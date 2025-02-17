const express = require("express");
const Job = require("../models/job"); // Import Job Schema

const cheerio = require('cheerio');
const axios = require("axios");
const router = express.Router();

// router.post("/job-search", async (req, res) => {
//     console.log("Received search data:", req.body);

//     try {
//         const {
//             keyword,
//             location,
//             dateSincePosted,
//             salaryRanges,  
//             experienceLevel,
//             remoteFilter,
//             jobType,
//             sortBy
//         } = req.body;

//         console.log("_____________________________________");

//         // Store job search query in MongoDB
//         const newSearch = new Job({
//             keyword,
//             location,
//             dateSincePosted,
//             salaryRanges,  
//             experienceLevel,
//             remoteFilter,
//             jobType,
//             //sortBy
//         });

//         await newSearch.save(); // Save to database
//         console.log("Search saved to database:", newSearch);

//         // Generate LinkedIn Job Search URL
//         const baseUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?`;
//         const params = new URLSearchParams();

//         if (keyword) params.append("keywords", keyword);
//         if (location) params.append("location", location);
//         if (dateSincePosted) params.append("f_TPR", dateSincePosted);
//         if (salaryRanges && salaryRanges.length > 0) params.append("f_SB2", salaryRanges.join(",")); // Convert array to string
//         if (experienceLevel) params.append("f_E", experienceLevel);
//         if (remoteFilter !== undefined) params.append("f_WT", remoteFilter);
//         if (jobType) params.append("f_JT", jobType);
//         if (sortBy === "recent") params.append("sortBy", "DD");
//         else if (sortBy === "relevant") params.append("sortBy", "R");

//         const finalUrl = baseUrl + params.toString();
//         console.log('----',finalUrl)
//         res.status(200).json({ success: true, url: finalUrl, savedSearch: newSearch });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// router.post("/fetch-jobs", async (req, res) => {
//     try {
//         const { linkedInUrl } = req.body; // Fetch URL from request body

//         if (!linkedInUrl) {
//             return res.status(400).json({ error: "LinkedIn URL is required in request body" });
//         }

//         console.log("Fetching jobs from:", linkedInUrl);

//         const response = await axios.get(linkedInUrl, {
//             headers: {
//                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//                 "Accept-Language": "en-US,en;q=0.9"
//             }
//         });

//         const $ = cheerio.load(response.data);
//         const jobs = [];

//         $('li').each((index, element) => {
//             const title = $(element).find('.base-search-card__title').text().trim();
//             const company = $(element).find('.base-search-card__subtitle').text().trim();
//             const location = $(element).find('.job-search-card__location').text().trim();
//             const date = $(element).find('.job-search-card__listdate').text().trim();
//             const link = $(element).find('a.base-card__full-link').attr('href');

//             if (title && company && location && date && link) {
//                 jobs.push({
//                     title,
//                     company,
//                     location,
//                     date,
//                     link
//                 });
//             }
//         });

//         res.status(200).json(jobs);
//     } catch (error) {
//         console.error("Error fetching LinkedIn jobs:", error.message);
//         res.status(500).json({ error: "Failed to fetch job postings" });
//     }
// });

router.post("/search", async (req, res) => {
    console.log("Received search data:", req.body);

    try {
        const {
            keyword,
            location,
            dateSincePosted,
            salaryRanges,
            experienceLevel,
            remoteFilter,
            jobType,
            sortBy
        } = req.body;

        console.log("_____________________________________");

        // Store job search query in MongoDB
        const newSearch = new Job({
            keyword,
            location,
            dateSincePosted,
            salaryRanges,
            experienceLevel,
            remoteFilter,
            jobType,
            //sortBy
        });

        await newSearch.save(); // Save to database
        console.log("Search saved to database:", newSearch);

        // Generate LinkedIn Job Search URL
        const baseUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?`;
        const params = new URLSearchParams();

        if (keyword) params.append("keywords", keyword);
        if (location) params.append("location", location);
        if (dateSincePosted) params.append("f_TPR", dateSincePosted);
        if (salaryRanges && salaryRanges.length > 0) params.append("f_SB2", salaryRanges.join(",")); // Convert array to string
        if (experienceLevel) params.append("f_E", experienceLevel);
        if (remoteFilter !== undefined) params.append("f_WT", remoteFilter);
        if (jobType) params.append("f_JT", jobType);
        if (sortBy === "recent") params.append("sortBy", "DD");
        else if (sortBy === "relevant") params.append("sortBy", "R");

        const finalUrl = baseUrl + params.toString();
        console.log('Generated LinkedIn URL:', finalUrl);

        // Fetch job listings from LinkedIn
        const response = await axios.get(finalUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9"
            }
        });

        // Parse HTML response using Cheerio
        const $ = cheerio.load(response.data);
        const jobs = [];

        // Extract job details from the initial listing
        for (const element of $('li').toArray()) {
            const title = $(element).find('.base-search-card__title').text().trim();
            const company = $(element).find('.base-search-card__subtitle').text().trim();
            const location = $(element).find('.job-search-card__location').text().trim();
            const date = $(element).find('.job-search-card__listdate').text().trim();
            const link = $(element).find('a.base-card__full-link').attr('href');
            const companyImage = $(element).find('.artdeco-entity-image').attr('data-delayed-url'); // Extract company image URL

            if (title && company && location && date && link) {
                // Fetch job description from the individual job page
                let jobDescription = "No description available";
                try {
                    const jobPageResponse = await axios.get(link, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                            "Accept-Language": "en-US,en;q=0.9"
                        }
                    });
                    const jobPage$ = cheerio.load(jobPageResponse.data);
                    jobDescription = jobPage$('.description__text').text().trim() || "No description available";
                } catch (error) {
                    console.error("Error fetching job description:", error.message);
                }

                jobs.push({
                    title,
                    company,
                    location,
                    date,
                    link,
                    companyImage: companyImage || null, // Add company image URL (fallback to null if not found)
                    jobDescription // Add job description
                });
            }
        }

        // Return JSON response with jobs and saved search data
        res.status(200).json({
            success: true,
            jobs,
            savedSearch: newSearch
        });
    } catch (error) {
        console.error("Error during job search:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
