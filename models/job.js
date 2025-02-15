const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    keyword: { type: String, required: true }, 
    location: { type: String, required: true }, 

    dateSincePosted: {
        type: String,
        enum: ["current_date", "past_week", "past_month"],
        default: "current_date"
    },

    salaryRanges: {  // ✅ Changed from salaryRange to salaryRanges
        type: [{ 
            start: { type: Number, required: true, min: 1000 }, 
            end: { 
                type: Number, 
                required: true, 
                validate: {
                    validator: function(value) {
                        return value > this.start; 
                    },
                    message: "End salary must be greater than start salary"
                }
            }
        }],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0; 
            },
            message: "At least one salary range is required"
        }
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
