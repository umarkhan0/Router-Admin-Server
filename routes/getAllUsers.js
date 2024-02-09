import express from "express";
import Admin from "../models/SingUp.js";
import jwt from "jsonwebtoken";
import User from "../models/allUser.js";
const router = express.Router();
router.get("/", async (request, response) => {
    const { authorization } = request.headers;
    const token = authorization?.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Admin.findOne({ email: decoded.email });
        if (user) {
            let { email, password } = user;
            if (email == decoded.email) {
                if (password == decoded.password) {

                    const users = await User.find();
                    return response.status(200).send({ users: users });


                } else {
                    return response.status(404).send({ messege: false });
                }
            }
        } else {
            return response.status(404).send({ messege: false });
        }

    } catch (err) {
        return response.status(400).send({ error: err });
    }
});

export default router;