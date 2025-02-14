const express = require("express");
const userController = require("../controllers/user"); // Import instance

const router = express.Router();

// 🟢 Register Route
router.post("/register", async (req, res, next) => {
    try {
        const userData = await userController.register(req);
        res.status(201).json({
            success: true,
            message: userData.message,
            data: userData.user
        });
    } catch (error) {
        console.error("Error registering user:", error);
        next(error);
    }
});

// 🔵 Login Route
router.post("/login", async (req, res, next) => {
    try {
        const loginData = await userController.login(req);
        res.status(200).json({
            success: true,
            message: loginData.message,
            data: loginData.user
        });
    } catch (error) {
        console.error("Error logging in:", error);
        next(error);
    }
});

module.exports = router;
