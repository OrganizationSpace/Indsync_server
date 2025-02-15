const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } // ⚠ Storing passwords in plain text (NOT recommended)
});

module.exports = mongoose.model("User", UserSchema);
