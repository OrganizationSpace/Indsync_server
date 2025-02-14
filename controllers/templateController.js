const Template_ = require("../models/templateModel");


class templateController {
    async save({name, content}) {
        try {
            const result = new Template_({ name, content });
            await result.save();
            return result
          } catch (error) {
            res.status(500).json({ error: "Error saving template" });
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
