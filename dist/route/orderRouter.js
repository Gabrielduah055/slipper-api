"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middlewares/auth");
const orderRouter = (0, express_1.Router)();
// Public: Create order
orderRouter.post("/", orderController_1.createOrder);
// Protected (Admin): Get all orders
orderRouter.get("/", auth_1.auth, orderController_1.getAllOrders);
exports.default = orderRouter;
//# sourceMappingURL=orderRouter.js.map