// const mongoose = require("mongoose");

// const templateSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Template name
//   content: { type: String, required: true }, // HTML template as a string
// });

// module.exports = mongoose.model("Template", templateSchema);


const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  // Personal Information (Required for All)
  name: { type: String },
  profilePicture: { type: String }, // Profile picture URL
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },

  // Career Objective / Summary (Required for All)
  objective: { type: String },

  // Education Details (Required for All)
  education: [
    {
      degree: { type: String },
      institution: { type: String },
      year: { type: String },
      cgpa: { type: String },
    }
  ],

  // Work Experience (Optional)
  experience: [
    {
      company: { type: String },
      jobTitle: { type: String },
      duration: { type: String },
      responsibilities: { type: String },
      achievements: { type: String },
      technologiesUsed: { type: [String] },
    }
  ],

  // Internships (Optional)
  internships: [
    {
      company: { type: String },
      role: { type: String },
      duration: { type: String },
      responsibilities: { type: String },
    }
  ],

  // Skills (Required for All)
  technicalSkills: { type: [String] },
  softSkills: { type: [String] },

  // Certifications & Training (Optional)
  certifications: [
    {
      name: { type: String },
      institution: { type: String },
      year: { type: String },
    }
  ],

  // Projects (Required for All)
  projects: [
    {
      title: { type: String },
      description: { type: String },
      technologiesUsed: { type: [String] },
      link: { type: String },
    }
  ],

  // Awards & Achievements (Optional)
  Achievements: [
    {
      title: { type: String },
      description: { type: String },
    }
  ],

  // Extra-Curricular Activities (Optional)
  activities: [
    {
      name: { type: String },
    }
  ],

  // Languages (Required for All)
  languages: { type: [String] },

  // References (Optional)
  references: [
    {
      name: { type: String },
      designation: { type: String },
      company: { type: String },
      email: { type: String },
      phone: { type: String },
    }
  ],

  // Signature (as Image URL, Required for All)
  signature: { type: String }, // Signature image URL

});

module.exports = mongoose.model("Template_", templateSchema);
