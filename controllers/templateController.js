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

     // Update Template
    async update(templateId, updatedData) {
      try {
          const updatedTemplate = await Template_.findOneAndUpdate(templateId, updatedData, { new: true });
          if (!updatedTemplate) throw new Error("Template not found");
          return updatedTemplate;
      } catch (error) {
          throw new Error("Error updating template");
      }
  }

  async delete(templateId) {
    try {
        const deletedTemplate = await Template_.deleteOne(templateId);
        if (!deletedTemplate) throw new Error("Template not found");
        return true;
    } catch (error) {
        throw new Error("Error deleting template");
    }
}
}

module.exports = new templateController();
