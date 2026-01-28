"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBufferToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadBufferToCloudinary = (buffer, folder = "products") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                return reject(error);
            if (!result?.secure_url)
                return reject(new Error("No secure_url returned from Cloudinary"));
            resolve(result.secure_url);
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
exports.uploadBufferToCloudinary = uploadBufferToCloudinary;
//# sourceMappingURL=cloudinary_upload.js.map