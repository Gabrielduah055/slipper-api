import { Request, Response, RequestHandler } from "express";
import Product from "../models/ProductSchema";

// Get all products
export const getAllProducts: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    res.status(500).json({ message: "Failed to get all products" });
  }
};

//get product by id
export const getProductById: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product: product,
    });
  } catch (error) {
    console.error("Error getting product by id:", error);
    res.status(500).json({ message: "Failed to get product by id" });
  }
};

// post product -> add product
export const createProduct: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      category,
      productName,
      productPrice,
      productImage,
      productThumnailImages,
      productStock,
      productDescription,
      isActive,
    } = req.body;

    // Field‑level validation
    const errors: Record<string, string> = {};

    if (!category || String(category).trim() === "") {
      errors.category = "Category is required";
    }

    if (!productName || String(productName).trim() === "") {
      errors.productName = "Product name is required";
    }

    if (
      productPrice === undefined ||
      productPrice === null ||
      isNaN(Number(productPrice))
    ) {
      errors.productPrice = "Product price is required and must be a number";
    }

    if (!productImage || String(productImage).trim() === "") {
      errors.productImage = "Main product image is required";
    }

    if (
      !Array.isArray(productThumnailImages) ||
      productThumnailImages.length === 0
    ) {
      errors.productThumnailImages = "At least one thumbnail image is required";
    }

    if (
      productStock === undefined ||
      productStock === null ||
      isNaN(Number(productStock))
    ) {
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

    const product = new Product({
      category,
      productName,
      productPrice,
      productImage,
      productThumnailImages: productThumnailImages || [],
      productStock,
      productDescription,
      isActive: isActive || true,
    });

    const saved = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product: saved,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// put product -> update product
export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, {
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
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

//delete product -> delete product
export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deleted,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
