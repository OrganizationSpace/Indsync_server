const mongoose = require("mongoose");

// Define a nested schema for salaryRange
const SalaryRangeSchema = new mongoose.Schema({
    start: { type: Number, required: true, min: 0 },
    end: { 
        type: Number, 
        required: true, 
        validate: {
            validator: function(value) {
                return value > this.start; // Ensure end > start
            },
            message: "End salary must be greater than start salary"
        }
    }
}, { _id: false }); // Prevent MongoDB from creating an _id for the subdocument

const JobSchema = new mongoose.Schema({
    keyword: { type: String, required: true }, // Job title or search keyword
    location: { type: String, required: true }, // Job location

    dateSincePosted: {
        type: String,
        enum: ["current_date", "past_week", "past_month"],
        default: "current_date"
    },

    salaryRange: { 
        type: SalaryRangeSchema, // Use the nested schema here
        required: true
    },

    experienceLevel: { 
        type: String, 
        enum: ["One year", "Two year", "Three year", "More than three years"], 
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

// Export Job Model
module.exports = mongoose.model("Job", JobSchema);
