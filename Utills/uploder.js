// cloudinaryUpload.js
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

export function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file?.path, (result, error) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result.url);
        }
      });
    });
  }
