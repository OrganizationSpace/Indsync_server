const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    objective: String,
    college: String,
    course: String,
    secondary: String,
    year: String,
    technical_skills: [String], // Array to store skills
    company: String,
    role: String,
    duration: String,
    project_description: String,
    project1: String,
    description1: String,
    project2: String,
    description2: String,
    certification1: String,
    institute1: String,
    certification2: String,
    institute2: String,
    soft_skills: [String], // Array to store soft skills
    languages: [String], // Array to store languages
    image: String, // Store profile picture URL
    templatename: String, // Template name for PDF generation
    pdfUrl: String, // Generated PDF link
});

module.exports = mongoose.model("Resume", ResumeSchema);
















// const mongoose = require("mongoose");

// const ResumeSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     objective: String,
//     college: String,
//     course: String,
//     secondary: String,
//     year: String,
//     technical_skills: [String], // Array to store skills
//     company: String,
//     role: String,
//     duration: String,
//     project_description: String,
//     project1: String,
//     description1: String,
//     project2: String,
//     description2: String,
//     certification1: String,
//     institute1: String,
//     certification2: String,
//     institute2: String,
//     soft_skills: [String], // Array to store soft skills
//     languages: [String], // Array to store languages
//     image: String, // Store profile picture URL
//     templatename: String, // Template name for PDF generation
//     pdfUrl: String, // Generated PDF link
//     wordUrl: String
// });

// module.exports = mongoose.model("Resume", ResumeSchema);
