const express = require("express");
const Resume = require("../controllers/resumeController");
const upload = require("../utils/uploadfile"); // AWS S3 Upload Middleware

const router = express.Router();
router.use(express.json())

//generate
router.post("/generate", upload, async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const {
            name, email, phone, address, objective, templatename,
            college, course, secondary, year,
            technical_skills, company, role, duration, project_description,
            project1, description1, project2, description2,
            certification1, institute1, certification2, institute2,
            soft_skills, languages
        } = req.body;

        const {originalname} = req.file; 
        const image = process.env.SPACE_DOMAIN + originalname;
        console.log('image',image)
        // ✅ Ensure all required data is provided
        const resumeData = {
            name: name || "Unknown",
            email: email || "No email provided",
            phone: phone || "No phone number",
            address: address || "No address",
            objective: objective || "No objective",
            college: college || "Not specified",
            course: course || "Not specified",
            secondary: secondary || "Not specified",
            year: year || "Not specified",
            technical_skills: technical_skills || "Not specified",
            company: company || "Not specified",
            role: role || "Not specified",
            duration: duration || "Not specified",
            project_description: project_description || "Not specified",
            project1: project1 || "Not specified",
            description1: description1 || "Not specified",
            project2: project2 || "Not specified",
            description2: description2 || "Not specified",
            certification1: certification1 || "Not specified",
            institute1: institute1 || "Not specified",
            certification2: certification2 || "Not specified",
            institute2: institute2 || "Not specified",
            soft_skills: soft_skills ? soft_skills.split(",") : ["Communication", "Problem-Solving", "Teamwork", "Time Management"],
            languages: languages ? languages.split(",") : ["English"],
            image: image || "https://via.placeholder.com/150", // ✅ Default Image
            templatename: templatename || "default"
        };

        console.log("✅Processed Resume Data:", resumeData);

        // ✅ Fix: return the response directly
        const setResume = await Resume.generateResume({resumeData});
        res.status(200).json({
            success: true,
            message: "Resume generated and saved successfully",
            resume: {
                resumeId: setResume._id,
                pdfUrl: setResume.pdfUrl, // ✅ Public download link
                userData: setResume // ✅ Return full user data
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error generating resume", error: error.message });
    }
});

//list
router.get("/list", async (req, res) => {
    try {
        const resumes = await Resume.list({});
        res.status(200).json({ success: true, data: resumes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching resumes", error: error.message });
    }
});

// Update resume by ID
router.post("/update/:id", async (req, res) => {
    try {
        const resumeId = req.params.id;
        const updatedData = req.body;
        // ✅ Call the controller function correctly
        const updatedResume = await Resume.update(resumeId, updatedData);
        if (!updatedResume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }
        res.status(200).json({ success: true, message: "✅ Resume updated successfully", data: updatedResume });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating resume", error: error.message });
    }
});

//delete
router.post("/delete", async (req, res) => {
    try {
        const { name } = req.body; // Get name from request body
        const result = await Resume.delete(name); // Call controller method
        res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting resume", error: error.message });
    }
});

module.exports = router;






































// //generate
// router.post("/generate", upload, async (req, res) => {
//     try {
//         console.log("Received Data:", req.body);

//         const {
//             name, email, phone, address, objective, templatename,
//             college, course, secondary, year,
//             technical_skills, company, role, duration, project_description,
//             project1, description1, project2, description2,
//             certification1, institute1, certification2, institute2,
//             soft_skills, languages
//         } = req.body;

//         const {originalname} = req.file; 
//         const image = process.env.SPACE_DOMAIN + originalname;
//         console.log('image',image)
//         // ✅ Ensure all required data is provided
//         const resumeData = {
//             name: name || "Unknown",
//             email: email || "No email provided",
//             phone: phone || "No phone number",
//             address: address || "No address",
//             objective: objective || "No objective",
//             college: college || "Not specified",
//             course: course || "Not specified",
//             secondary: secondary || "Not specified",
//             year: year || "Not specified",
//             technical_skills: technical_skills || "Not specified",
//             company: company || "Not specified",
//             role: role || "Not specified",
//             duration: duration || "Not specified",
//             project_description: project_description || "Not specified",
//             project1: project1 || "Not specified",
//             description1: description1 || "Not specified",
//             project2: project2 || "Not specified",
//             description2: description2 || "Not specified",
//             certification1: certification1 || "Not specified",
//             institute1: institute1 || "Not specified",
//             certification2: certification2 || "Not specified",
//             institute2: institute2 || "Not specified",
//             soft_skills: soft_skills ? soft_skills.split(",") : ["Communication", "Problem-Solving", "Teamwork", "Time Management"],
//             languages: languages ? languages.split(",") : ["English"],
//             image: image || "https://via.placeholder.com/150", // ✅ Default Image
//             templatename: templatename || "default"
//         };

//         console.log("✅Processed Resume Data:", resumeData);

//         // ✅ Fix: return the response directly
//         const setResume = await Resume.generateResume({resumeData});
//         res.status(200).json({
//             success: true,
//             message: "Resume generated and saved successfully",
//             resume: {
//                 resumeId: setResume._id,
//                 pdfUrl: setResume.pdfUrl, // PDF link
//                 wordUrl: setResume.wordUrl, // Word link
//                 userData: setResume 
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error generating resume", error: error.message });
//     }
// });