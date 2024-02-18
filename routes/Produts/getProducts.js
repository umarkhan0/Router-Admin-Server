import express from "express";
import Admin from "../../models/SingUp.js";
import AddProducts from "../../models/AddProduct.js";
import jwt from "jsonwebtoken";
import fs from "fs"

import verifyToken from "../../middlewere/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const user = await Admin.findOne({ email: decoded.email });
        if (!user || user.email !== decoded.email || user.password !== decoded.password) {
            return res.status(404).send({ message: "Wrong Auth" });
        }
        const allProducts = await AddProducts.find();
        return res.status(200).send({ products: allProducts });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});



export default router;
