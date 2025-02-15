const User = require("../schema/user");


class UserController {
    // 🟢 User Registration
    async register(req) {
        try {
            const { name, phoneNumber, email, password } = req.body;

            // Validate required fields
            if (!name || !phoneNumber || !email || !password) {
                throw new Error("All fields are required!");
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("User already exists with this email!");
            }

            // Save new user to database
            const newUser = new User({ name, phoneNumber, email, password });
            await newUser.save();

            return { message: "User registered successfully!", user: newUser };
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }

    // 🔵 User Login
    async login(req) {
        try {
            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                throw new Error("Email and password are required!");
            }

            // Find user by email
            const user = await User.findOne({ email });

            if (!user || user.password !== password) {
                throw new Error("Invalid email or password!");
            }

            return { message: "Login successful!", user };
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }
}

module.exports = new UserController(); // Export an instance
