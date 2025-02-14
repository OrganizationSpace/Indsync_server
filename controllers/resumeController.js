const ResumeModel = require('../models/resumeModel');
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
}

module.exports = new resumeController();
