import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME!,
    cloud_api_key: process.env.CLOUDINARY_APIKEY!,
    cloud_secret_key: process.env.CLOUDINARY_SECRET!,
})

export default cloudinary;