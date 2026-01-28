"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = exports.getProductCategories = void 0;
const ProductSchema_1 = __importDefault(require("../models/ProductSchema"));
const cloudinary_upload_1 = require("../utils/cloudinary_upload");
const PRODUCT_CATEGORIES = ["Half Shoe", "Sandal", "Slippers", "Shoe", "Sneaker", "Custom"];
const getProductCategories = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Product categories fetched successfully',
            categories: PRODUCT_CATEGORIES,
        });
    }
    catch (error) {
        console.error('Error getting product categories:', error);
        res.status(500).json({ message: 'Failed to get product categories' });
    }
};
exports.getProductCategories = getProductCategories;
// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductSchema_1.default.find({ isActive: true }).sort({
            createdAt: -1,
        });
        res.status(200).json({
            message: "Products fetched successfully",
            products: products,
        });
    }
    catch (error) {
        console.error("Error getting all products:", error);
        res.status(500).json({ message: "Failed to get all products" });
    }
};
exports.getAllProducts = getAllProducts;
//get product by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductSchema_1.default.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({
            message: "Product fetched successfully",
            product: product,
        });
    }
    catch (error) {
        console.error("Error getting product by id:", error);
        res.status(500).json({ message: "Failed to get product by id" });
    }
};
exports.getProductById = getProductById;
// post product -> add product
const createProduct = async (req, res) => {
    try {
        console.log('Files Recieved:', req.files);
        console.log('Body Recieved:', req.body);
        const { category, productName, productPrice, productStock, productSize, productDescription, isActive, } = req.body;
        const files = req.files;
        const mainImageFile = files?.productImage?.[0];
        const thumbnailImagesFiles = files?.productThumbnailImages;
        // Field‑level validation
        const errors = {};
        if (!category || String(category).trim() === "") {
            errors.category = "Category is required";
        }
        if (!productName || String(productName).trim() === "") {
            errors.productName = "Product name is required";
        }
        if (!productSize || isNaN(Number(productSize))) {
            errors.productSize = "Product size is required and must be a number";
        }
        if (productPrice === undefined ||
            productPrice === null ||
            isNaN(Number(productPrice))) {
            errors.productPrice = "Product price is required and must be a number";
        }
        if (!mainImageFile) {
            errors.productImage = "Main product image is required";
        }
        if (!thumbnailImagesFiles || thumbnailImagesFiles.length === 0) {
            errors.productThumbnailImages = "At least one thumbnail image is required";
        }
        if (productStock === undefined ||
            productStock === null ||
            isNaN(Number(productStock))) {
            errors.productStock = "Product stock is required and must be a number";
        }
        if (!productDescription || String(productDescription).trim() === "") {
            errors.productDescription = "Product description is required";
        }
        if (Object.keys(errors).length > 0) {
            res.status(400).json({
                message: "Validation error",
                errors,
            });
            return;
        }
        const productImageUrl = await (0, cloudinary_upload_1.uploadBufferToCloudinary)(mainImageFile.buffer, "products/main");
        const thumnailUrls = await Promise.all(thumbnailImagesFiles.map(file => (0, cloudinary_upload_1.uploadBufferToCloudinary)(file.buffer, 'products/thumbnails')));
        const product = new ProductSchema_1.default({
            category,
            productName,
            productPrice,
            productImage: productImageUrl,
            productThumbnailImages: thumnailUrls,
            productStock,
            productSize,
            productDescription,
            isActive: isActive == "true",
        });
        const saved = await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product: saved,
        });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: "Failed to create product",
            error: error?.message || error,
        });
    }
};
exports.createProduct = createProduct;
// put product -> update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const files = req.files;
        const newThumbnailFiles = files?.productThumbnailImages || [];
        const newThumbnailUrl = await Promise.all(newThumbnailFiles.map(file => (0, cloudinary_upload_1.uploadBufferToCloudinary)(file.buffer, 'products/thumbnails')));
        let existingThumbnailUrls = req.body.productThumbnailImages || [];
        if (!Array.isArray(existingThumbnailUrls)) {
            existingThumbnailUrls = [existingThumbnailUrls];
        }
        //handling the main image
        let mainImageUrl = req.body.productImage;
        if (files?.productImage?.[0]) {
            mainImageUrl = await (0, cloudinary_upload_1.uploadBufferToCloudinary)(files.productImage[0].buffer, 'products/main');
        }
        const allThumbnailUrls = [...existingThumbnailUrls, ...newThumbnailUrl];
        const updateData = {
            ...req.body,
            productImage: mainImageUrl,
            productThumbnailImages: allThumbnailUrls
        };
        const updated = await ProductSchema_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({
            message: "Product updated successfully",
            product: updated,
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
};
exports.updateProduct = updateProduct;
//delete product -> delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ProductSchema_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({
            message: "Product deleted successfully",
            product: deleted,
        });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map