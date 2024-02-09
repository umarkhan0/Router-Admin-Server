import express from "express";
import Joi from "joi";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/SingUp.js";

const router = express.Router();

// Validation schema for user input
const userSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required().min(6),
});

// Route for user login
router.post("/", async (req, res) => {
    try {
        // Validate user input
        const { error } = userSchema.validate(req.body);

        if (error) {
            return res.status(400).send({ status_code: 400, message: error.details[0].message });
        }

        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).send({ status_code: 401, message: "Invalid email or password" });
        }

        // Compare the provided password with the stored hashed password
        const compare = await bcrypt.compare(password, user.password);

        // If passwords match, generate a JWT token and send a success response
        if (compare) {
            const token = Jwt.sign({ email: user.email, password: user.password }, process.env.JWT_SECRET);
            delete user.password;
            return res.status(200).send({ status_code: 200, message: "success", token, user });
        } else {
            // If passwords don't match, send an error response
            return res.status(403).send({ status_code: 403, message: "Invalid email or password" });
        }
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        return res.status(500).send({ status_code: 500, message: "Internal Server Error" });
    }
});

export default router;
