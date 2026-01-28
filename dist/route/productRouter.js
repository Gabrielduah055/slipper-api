"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middlewares/auth");
const upload_1 = require("../middlewares/upload");
const productRouter = (0, express_1.Router)();
//public;
productRouter.get("/categories", productController_1.getProductCategories);
productRouter.get("/", productController_1.getAllProducts);
productRouter.get("/:id", productController_1.getProductById);
productRouter.post("/", auth_1.auth, upload_1.upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productThumbnailImages", maxCount: 5 },
]), productController_1.createProduct);
productRouter.put("/:id", auth_1.auth, upload_1.upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productThumbnailImages", maxCount: 5 },
]), productController_1.updateProduct);
productRouter.delete("/:id", auth_1.auth, productController_1.deleteProduct);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map