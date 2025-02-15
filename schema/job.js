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
        type: { 
            start: { type: Number}, 
            enum:["10000","25000","50000+"]
        },
        required: true,
        default: "10000"
    },

    experienceLevel: { 
        type: String, 
        enum: ["One year", "Two year", "Three year", "More than three years"], 
    }, 

    remoteFilter: { type: Boolean, default: false }, 
    jobType: { 
        type: String, 
        enum: ["Full-time", "Part-time", "Internship"], 
        default: "Full-time" 
    },

    sortBy: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema);
