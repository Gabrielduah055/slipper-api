
import cloudinary from "../config/cloudinary";
import streamifier from 'streamifier';

export const uploadBufferToCloudinary = (
    buffer: Buffer,
    folder = "products"
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (result?.secure_url) resolve(result.secure_url);
                else reject(error)
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    })
}