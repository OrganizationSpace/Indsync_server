const express = require("express");
const TemplateController = require('../controllers/templateController');

const router = express.Router();

router.post("/save", async(req, res)=> {
    try{
        const { name, content } = req.body;
        const savetemplates = await TemplateController.save({name, content});
        res.status(200).json({ success: true, savetemplates });
    } catch (error){
        res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const listtemplates = await TemplateController.list({});
        res.status(200).json({ success: true, listtemplates });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
    }
});

// Update Template
router.post("/update", async (req, res) => {
    try {
        const templateId = req.body;
        const updatedData = req.body;
        const updatedTemplate = await TemplateController.update(templateId, updatedData);
        res.status(200).json({ success: true, message: "Template updated successfully", updatedTemplate });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating template", error: error.message });
    }
});

// Delete Template
router.delete("/delete", async (req, res) => {
    try {
        const templateId = req.params.id;
        await TemplateController.delete(templateId);
        res.status(200).json({ success: true, message: "Template deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting template", error: error.message });
    }
});

module.exports = router;
