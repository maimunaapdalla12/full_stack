import dotenv from "dotenv";

dotenv.config();


export const port = process.env.PORT;
export const dburl = process.env.MONGO_URL;
export const jwt_secret = process.env.JWT_SECRET; // Ensure this matches the case in your .env file

export const CLOUDINARY_NAME = process.env.CLOUDINARTY_NAME; // Fixed typo
export const CLOUDINARY_API_KEY = process.env.CLOUDINARTYE_API_KEY; // Fixed typo
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARTY_API_SECRET; // Fixed typo

 

