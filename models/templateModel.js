const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Template name
  content: { type: String, required: true }, // HTML template as a string
});

module.exports = mongoose.model("Template", templateSchema);
