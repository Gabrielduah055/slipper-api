import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
} from "../controllers/productController";
import { auth } from "../middlewares/auth";

const productRouter = Router();

//public;
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/categories", getProductCategories)

//protected admin only
productRouter.post("/", auth, createProduct);
productRouter.put("/:id", auth, updateProduct);
productRouter.delete("/:id", auth, deleteProduct);

export default productRouter;
