const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    keyword: { type: String, required: true }, // Job title or search keyword
    location: { type: String, required: true }, // Job location
    dateSincePosted: { type: String }, // Past week, month, etc.
    salary: { type: String }, // Minimum salary filter
    experienceLevel: { type: String }, // Entry, mid, senior, etc.
    remoteFilter: { type: String }, // 1 = remote, 0 = office
    jobType: { type: String }, // Full-time, part-time, contract, etc.
    sortBy: { type: String, enum: ["recent", "relevant"] }, // Sorting option
    start: { type: Number, default: 0 }, // Job start index
    page: { type: Number, default: 1 }, // Pagination number
    createdAt: { type: Date, default: Date.now } // Timestamp of the search
});

// Export Job Model
module.exports = mongoose.model("Job", JobSchema);
