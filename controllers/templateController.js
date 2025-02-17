const Template_ = require("../models/templateModel");


class templateController {
    
  async  add(data) {
    try {
      console.log("Data received in controller:", data);
  
      // Remove empty or undefined fields
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
          // Keep non-empty arrays and non-null objects
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === "object" && value !== null) return Object.keys(value).length > 0;
          return value !== "" && value !== null && value !== undefined; // Keep non-empty strings
        })
      );
  
      console.log("Filtered data after cleaning:", filteredData);
  
      // Create a new template with the filtered data
      const newTemplate = new Template_(filteredData);
  
      // Save the template to the database
      const result = await newTemplate.save();
  
      console.log("Saved template:", result);
      return result; // Return the saved template
    } catch (error) {
      console.error("Error adding template data in controller:", error);
      throw error;  // Propagate the error if any
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