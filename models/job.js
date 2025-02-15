const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    keyword: { type: String, required: true }, // Job title or search keyword
    location: { type: String, required: true }, // Job location

    dateSincePosted: {
        type: String,
        enum: ["current_date", "past_week", "past_month"],
        default: "current_date"
    },

    salaryRange: { 
        start: { type: Number, required: true, min: 0 },
        end: { 
            type: Number, 
            required: true, 
            validate: {
                validator: function(value) {
                    return value > this.salaryRange.start; // Ensure end > start
                },
                message: "End salary must be greater than start salary"
            }
        }
    },

    experienceLevel: { 
        type: String, 
        enum: ["One year", "Two year", "Three year","More than three years"], 
        //default: "One year" 
    }, 

    remoteFilter: { type: Boolean, default: false }, // true = remote, false = office
    jobType: { 
        type: String, 
        enum: ["Full-time", "Part-time", "Internship"], 
        default: "Full-time" 
    },

    sortBy: { type: Date, default: Date.now }, // Sort by selected date

    createdAt: { type: Date, default: Date.now } // Timestamp of the search
});

// Function to get predefined date filters
JobSchema.statics.getDateFilter = function (filterType) {
    const today = new Date();
    if (filterType === "past_week") {
        return new Date(today.setDate(today.getDate() - 7)); // 7 days ago
    } else if (filterType === "past_month") {
        return new Date(today.setMonth(today.getMonth() - 1)); // 1 month ago
    } 
    return today; // Default to current date
};

// Export Job Model
module.exports = mongoose.model("Job", JobSchema);
