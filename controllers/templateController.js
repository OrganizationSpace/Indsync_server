const Template_ = require("../models/templateModel");


class templateController {
    
    async add(selectedFields) {
      try {
          // Validate selected fields against the schema fields
          const validFields = Object.keys(Template_.schema.obj);
          const isValid = selectedFields.every(field => validFields.includes(field));
  
          if (!isValid) {
              throw new Error('Invalid field(s) selected');
          }
  
          // Here you can process the selected fields (e.g., prepare the resume generation, etc.)
          // For now, we can just return the valid selected fields.
  
          return { selectedFields };
  
      } catch (error) {
          throw new Error('Error processing selected fields: ' + error.message);
      }
    }

    async list({}) {
        try {
            const result = await Template_.find();
            return result
          } catch (error) {
            res.status(500).json({ error: "Error saving template" });
          }
    }  
}

module.exports = new templateController();



 // async save({name, content}) {
    //     try {
    //         const result = new Template_({ name, content });
    //         await result.save();
    //         return result
    //       } catch (error) {
    //         res.status(500).json({ error: "Error saving template" });
    //       }
    // } 