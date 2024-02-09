// app.js
import express from 'express';
import upload from "../middlewere/multer.js";
import verifyToken from '../middlewere/verifyToken.js';
import { uploadToCloudinary } from '../Utills/uploder.js';
import AddProducts from "../models/AddProduct.js";

const router = express.Router();

router.post('/', verifyToken, upload.array('images', 3), async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    try {
        let firstImageOb = req.files[0];
        let secondImageOb = req.files[1];
        let thirdImageOb = req.files[2];

        const firstImage = firstImageOb ? await uploadToCloudinary(firstImageOb) : null;
        const secondImage = secondImageOb ? await uploadToCloudinary(secondImageOb) : null;
        const thirdImage = thirdImageOb ? await uploadToCloudinary(thirdImageOb) : null;

        let { title, description, price, rating } = req.body;

        // Populate the images array with the URLs of the uploaded images
        let images = [firstImage, secondImage, thirdImage];

        let data = {
            title,
            description,
            price,
            rating,
            images,
        };

        console.log(data);
        const userOtp = new AddProducts(data);
        let product = await userOtp.save();

        return res.status(200).json({
            message: product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unauthorized",
        });
    }
});

export default router;
