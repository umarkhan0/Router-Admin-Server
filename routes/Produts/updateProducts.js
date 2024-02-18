import express from "express";
// import Admin from "../models/SingUp.js";
import AddProducts from "../../models/AddProduct.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import Joi from 'joi';
import uploadToCloudinary from "../../Utills/uploder.js";
import { upload } from "../../middlewere/multer.js";

const router = express.Router();
const updateProductSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    rating: Joi.number(),
});

router.put("/:productId", upload.array('files', 5), async (req, res) => {
    try {
        const uploadedFiles = req.files;
        let fileUrls = [];

        if (uploadedFiles && uploadedFiles.length > 0) {
            try {
                for (const file of uploadedFiles) {
                    const cloudinaryUrl = await uploadToCloudinary(file.path);
                    fileUrls.push(cloudinaryUrl);
                    fs.unlinkSync(file.path);
                }
            } catch (error) {
                console.error(error);
                uploadedFiles.forEach(file => fs.unlinkSync(file.path));
                return res.status(500).send({ message: 'Error uploading files' });
            }
        }

        // Validate request body
        const { error } = updateProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const updatedProduct = await AddProducts.findByIdAndUpdate(req.params.productId, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product updated successfully", product: updatedProduct });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

export default router;
