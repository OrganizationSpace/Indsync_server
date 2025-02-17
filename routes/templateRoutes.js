const express = require("express");
const TemplateController = require('../controllers/templateController');

const router = express.Router();

router.post(
	"/add",
	async (req, res, next) => {
		try {
			const filteredData = {};

			// Filtering only user-provided fields
			Object.keys(req.body).forEach((key) => {
				if (req.body[key]) filteredData[key] = req.body[key];
			});

			// Add new template entry
			const templateAdd = await template.add(filteredData);

			// Respond with success message
			res.status(200).json({
				success: true,
				message: "Template data added successfully",
				data: { _id: templateAdd._id },
			});
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
);

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