// cloudinaryUpload.js
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});
async function uploadToCloudinary(filePath) {
  try {
    const response = await cloudinary.uploader.upload(filePath);
    console.log("response===============", response)
    return response.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default uploadToCloudinary;
