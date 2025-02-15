const fs = require("fs");
const path = require("path");

const ResumeModel = require('../models/resumeModel');
const Template_ = require('../models/templateModel');
const generatePDF = require('../utils/pdfGenerator');

class resumeController {
    //generate resume
    async generateResume({resumeData}) {
        try {
            console.log("Received Resume Data:", resumeData);
    
            // ✅ Generate PDF & get the download link
            const pdfUrl = await generatePDF(resumeData);
    
            // ✅ Save full user data in MongoDB
            const result = await ResumeModel.create({
                name: resumeData.name,
                email: resumeData.email,
                phone: resumeData.phone,
                address: resumeData.address,
                objective: resumeData.objective,
                college: resumeData.college,
                course: resumeData.course,
                secondary: resumeData.secondary,
                year: resumeData.year,
                technical_skills: resumeData.technical_skills,
                company: resumeData.company,
                role: resumeData.role,
                duration: resumeData.duration,
                project_description: resumeData.project_description,
                project1: resumeData.project1,
                description1: resumeData.description1,
                project2: resumeData.project2,
                description2: resumeData.description2,
                certification1: resumeData.certification1,
                institute1: resumeData.institute1,
                certification2: resumeData.certification2,
                institute2: resumeData.institute2,
                soft_skills: resumeData.soft_skills, // ✅ Array
                languages: resumeData.languages, // ✅ Array
                image: resumeData.image, // ✅ Store image URL
                templatename: resumeData.templatename,
                pdfUrl: pdfUrl // ✅ Store PDF URL
            });
            console.log("Saved Resume Data:", result);

            return result
        } catch (error) {
            console.error("Error processing resume:", error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }    

    //list
    async list({}) {
            try {
                const result = await ResumeModel.find();
                return result
            } catch (error) {
                res.status(500).json({ error: "Error saving template" });
            }
    }  

    //update
    async update(resumeId, updatedData) {
        try {
            const result = await ResumeModel.findOneAndUpdate(
                { _id: resumeId },  // ✅ Ensure it finds by _id
                updatedData,
                { new: true }
            );
            return result;
        } catch (error) {
            console.error("Error updating resume:", error);
            throw new Error("Error updating resume");
        }
    }     
    
     //delete
     async delete(name) { 
        try {    
            // Find the resume by name
            const resume = await ResumeModel.findOne({ name });
            if (!resume) {
                return { success: false, message: "Resume not found" };
            }
    
            // Extract and delete PDF file
            const pdfPath = resume.pdfUrl.replace("http://localhost:5000", ""); // Adjust for actual server path
            const fullPdfPath = path.join(__dirname, "..", pdfPath);
    
            if (fs.existsSync(fullPdfPath)) {
                fs.unlinkSync(fullPdfPath);
                console.log(`Deleted PDF: ${fullPdfPath}`);
            }
    
            // Delete resume from database
            await ResumeModel.deleteOne({ name });
    
            return { success: true, message: "Resume and PDF deleted successfully" };
        } catch (error) {
            console.error("Error deleting resume:", error);
            throw new Error("Failed to delete resume: " + error.message);
        }
    }
    
}

module.exports = new resumeController();












