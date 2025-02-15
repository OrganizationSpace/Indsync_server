const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    keyword: { type: String, required: true },  
    location: { type: String, required: true },  

    dateSincePosted: {
        type: String,
        enum: ["current_date", "past_week", "past_month"],
        default: "current_date"
    },

    salaryRanges: {
        type: { type: String, enum: ["0-50k", "50k-100k", "100k-150k", "150k-200k", "200k+"] },
        required: true
    },

    experienceLevel: {
        type: String,
        enum: ["One year", "Two years", "Three years", "More than three years"],
        required: true
    },

    remoteFilter: { type: Boolean, default: false }, 
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Internship"],
        default: "Full-time"
    },

    //sortBy: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema);
