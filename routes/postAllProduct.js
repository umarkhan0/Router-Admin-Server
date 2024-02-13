// app.js
import express from 'express';
import fs from "fs"
import {upload} from "../middlewere/multer.js"
import verifyToken from '../middlewere/verifyToken.js';
import uploadToCloudinary from "../Utills/uploder.js"
import AddProducts from "../models/AddProduct.js";

const router = express.Router();

router.post('/',  upload.array('files', 5), async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

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





      
        let { title, description, price, rating } = req.body;

        // Populate the images array with the URLs of the uploaded images
        // let images = [firstImage, secondImage, thirdImage];

        let data = {
            title,
            description,
            price,
            rating,
            images: fileUrls,
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
