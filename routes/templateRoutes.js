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

module.exports = router;
