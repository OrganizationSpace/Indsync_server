const ResumeModel = require('../models/resumeModel');
const Template_ = require('../models/templateModel');
const generatePDF = require('../utils/pdfGenerator');

class resumeController {
    //generate resume
    async generateResume (req, res) {
        try {
            const resumeData = req.body;
            console.log("Received Resume Data:", resumeData);

            // ✅ Generate PDF & get the download link
            const pdfUrl = await generatePDF(resumeData);

            // ✅ Save resume in MongoDB with PDF URL
            const newResume = await ResumeModel.create({
                name: resumeData.name,
                email: resumeData.email,
                phone: resumeData.phone,
                pdfUrl: pdfUrl, // ✅ Save PDF link
            });

            return res.status(200).json({
                success: true,
                resume: {
                    pdfUrl: pdfUrl, // ✅ Public download link
                    resumeId: newResume._id,
                }
            });

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
    async edit(id, templateId, userData) {
        try {
            console.log('------------------------')
            console.log("Fetching template with ID:", templateId);
    
            // ✅ Fetch the selected template
            const template = await Template_.findById(templateId);
            console.log('Fetched template:', template);
            
            if (!template) {
                throw new Error("Template not found");
            }
    
            // ✅ Merge user data with template
            let updatedTemplateContent = template.content;
            for (const key in userData) {
                const placeholder = `{{${key}}}`;
                updatedTemplateContent = updatedTemplateContent.replace(new RegExp(placeholder, "g"), userData[key] || "");
            }
    
            console.log("Updated Template Content:", updatedTemplateContent);
    
            // ✅ Fix: Send template name to `generatePDF`
            const newPdfUrl = await generatePDF({
                templatename: template.name, // ✅ Fix: Include template name
                content: updatedTemplateContent
            });
    
            // ✅ Update the resume in the database
            const result = await ResumeModel.findOneAndUpdate(
                { _id: id },
                { templateId, pdfUrl: newPdfUrl },
                { new: true }
            );
    
            if (!result) {
                throw new Error("Failed to update resume");
            }
    
            return result;
        } catch (error) {
            console.error("Error updating resume:", error.message);
            throw new Error(error.message);
        }
    }      
    
     //delete
    async delete({}) {
        try {
            const result = await ResumeModel.updateOne({});
            return result
        } catch (error) {
            res.status(500).json({ error: "Error saving template" });
        }
    }  
}

module.exports = new resumeController();
