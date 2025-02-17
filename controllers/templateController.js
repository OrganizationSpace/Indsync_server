const Template_ = require("../models/templateModel");


class templateController {
    
  async add(data) {
		try {
			// Remove empty or undefined fields
			const filteredData = Object.fromEntries(
				Object.entries(data).filter(([_, value]) => {
					// Check if value is not empty
					if (Array.isArray(value)) return value.length > 0; // Keep non-empty arrays
					if (typeof value === "object" && value !== null) return Object.keys(value).length > 0; // Keep non-empty objects
					return value !== "" && value !== null && value !== undefined; // Keep non-empty strings and non-null values
				})
			);

			// Save only non-empty fields
			const result = await new Template_(filteredData).save();
			return result;
		} catch (error) {
			console.error("Error adding template data:", error);
			throw error;
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