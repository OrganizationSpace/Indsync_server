const express = require("express");
const Template = require('../controllers/templateController');
const upload = require('../utils/uploadfile')
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
  
        console.log("✅ Template added successfully:", templateAdd);
  
        // Respond with success message and template ID
        res.status(200).json({
          success: true,
          message: "✅ Template data added successfully",
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
        const listtemplates = await Template.list({});
        res.status(200).json({ success: true, listtemplates });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error listing templates', error: error.message });
    }
});

//fetch
router.post('/fetch', async (req, res) => {
    try {
        const { email } = req.body;  // Access name from request body
        console.log('Email to list:', email);

        // Fetch templates based on the name (or all templates if no name is provided)
        const fetchtemplates = await Template.fetch(email);
        console.log('✅ fetchedtemplate',fetchtemplates)
        // Respond with the list of templates
        res.status(200).json({ success: true, fetchtemplates });
    } catch (error) {
        // Handle error if something goes wrong
        res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
    }
});

//profile add
router.post("/profile/add",upload,async(req,res,next)=>{
  try{
    const {email} = req.body;
    console.log("email",req.body)
    const {originalname} = req.file; 
    const image = process.env.SPACE_DOMAIN + originalname;
    console.log('image',image)

    const profileUpload = await Template.addProfile(email,image)
    console.log('uploaded',profileUpload)

    res.status(200).json({
      success: true,
      message: "✅ Image added successfully",
      data: profileUpload,
    });
  } catch(error){
        console.error("Error in /profile/add route:", error);
        next(error);
  }
})

//signature add
router.post("/signature/add",upload,async(req,res,next)=>{
  try{
    const {email} = req.body;
    const {originalname} = req.file; 
    const image = process.env.SPACE_DOMAIN + originalname;
    console.log('image',image)

    const signatureUpload = await Template.addSignature(email,image)
    console.log('uploaded',signatureUpload)

    res.status(200).json({
      success: true,
      message: "✅ Image added successfully",
      data: signatureUpload,
    });
  } catch(error){
        console.error("Error in /signature/add route:", error);
        next(error);
  }
})

//delete
router.post("/delete",async(req,res,next)=>{
try{
  const _id = req.body
  const templateDelete = await Template.delete(_id)
  console.log('template deleted', templateDelete)
  res.status(200).json({
    success: true,
      message: "✅ template deleted successfully",
      data: templateDelete,
  })
}catch(error){
  console.error("Error in /signature/add route:", error);
  next(error);
}
})

//delete profile
router.post("/profile/delete",async(req,res,next)=>{
  try{
    const _id = req.body
    const profileDeleted = await Template.profileDelete(_id)
    console.log('profile deleted', profileDeleted)
    res.status(200).json({
      success: true,
        message: "✅ profile deleted successfully",
        data: profileDeleted,
    })
  }catch(error){
    console.error("Error in /profile/delete route:", error);
  next(error);
  }
})

//signature profile
router.post("/signature/delete",async(req,res,next)=>{
  try{
    const _id = req.body
    const signatureDeleted = await Template.signatureDelete(_id)
    console.log('signature deleted', signatureDeleted)
    res.status(200).json({
      success: true,
        message: "✅ signature deleted successfully",
        data: signatureDeleted,
    })
  }catch(error){
    console.error("Error in /signature/delete route:", error);
  next(error);
  }
})

// Update Route
router.post("/update", async (req, res) => {
  try {
    const { _id, ...dataToUpdate } = req.body; // Extract _id separately

    if (!_id) {
      return res.status(400).json({ error: "Missing _id field" });
    }

    const updatedTemplate = await Template.update(_id, dataToUpdate);

    if (!updatedTemplate) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(200).json({ message: "Template updated successfully", updatedTemplate });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

//dummy route
// router.post("/dummy",upload,async(req,res,next)=>{
//   console.log("-----",req.file)
//   try {
//     if (!req.file) {
//         return res.status(400).json({ message: "No image uploaded" });
//     }

//     console.log("File received:", req.file);
    
//     res.json({
//         message: "Image received successfully",
//         filename: req.file.originalname,
//         mimetype: req.file.mimetype,
//         size: req.file.size
//     });
// } catch (error) {
//     next(error);
// }
// })


// router.post("/save", async(req, res)=> {
//     try{
//         const { name, content } = req.body;
//         const savetemplates = await TemplateController.save({name, content});
//         res.status(200).json({ success: true, savetemplates });
//     } catch (error){
//         res.status(500).json({ success: false, message: 'Error fetching templates', error: error.message });
//     }
// });