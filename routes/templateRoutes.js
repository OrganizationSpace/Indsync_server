const express = require("express");
const TemplateController = require('../controllers/templateController');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const selectedFields = req.body.selectedFields;  // Receive selected fields array from frontend
        console.log('---------✅-----------------')
        const response = await TemplateController.add(selectedFields); // Controller logic
        res.status(200).json({ success: true, message: '✅Fields processed successfully', response });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error processing selected fields', error: error.message });
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



// router.post("/save", async(req, res)=> {
//     try{
//         const { name, content } = req.body;
//         const savetemplates = await TemplateController.save({name, content});
//         res.status(200).json({ success: true, savetemplates });
//     } catch (error){
//         res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
//     }
// });