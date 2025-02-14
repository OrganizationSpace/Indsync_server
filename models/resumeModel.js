const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    objective: String,
    templateId: mongoose.Schema.Types.ObjectId,
    pdfUrl: String
});

module.exports = mongoose.model("Resume", ResumeSchema);
