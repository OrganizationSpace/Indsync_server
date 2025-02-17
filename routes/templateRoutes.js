const express = require("express");
const Template = require('../controllers/templateController');

const router = express.Router();

//add
router.post("/add",async (req, res, next) => {
      try {
        const filteredData = {};
  
        console.log("Received request body:", req.body);
  
        // Filtering only user-provided fields from the request body
        Object.keys(req.body).forEach((key) => {
          if (req.body[key]) {
            filteredData[key] = req.body[key];
          }
        });
  
        console.log("Filtered data for template:", filteredData);
  
        // Add new template entry using controller method
        const templateAdd = await Template.add(filteredData);
  
        console.log("Template added successfully:", templateAdd);
  
        // Respond with success message and template ID
        res.status(200).json({
          success: true,
          message: "Template data added successfully",
          data: { template : templateAdd },
        });
      } catch (error) {
        console.error("Error in /add route:", error);
        next(error);
      }
    }
);  

//list
router.get('/list', async (req, res) => {
    try {
        const listtemplates = await TemplateController.list({});
        res.status(200).json({ success: true, listtemplates });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
    }
});

//fetch
router.post('/fetch', async (req, res) => {
    try {
        const { name } = req.body;  // Access name from request body
        console.log('Name to list:', name);

        // Fetch templates based on the name (or all templates if no name is provided)
        const listtemplates = await Template.fetch(name);

        // Respond with the list of templates
        res.status(200).json({ success: true, listtemplates });
    } catch (error) {
        // Handle error if something goes wrong
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