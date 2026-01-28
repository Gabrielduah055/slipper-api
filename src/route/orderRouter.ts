import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController";
import { auth } from "../middlewares/auth";

const orderRouter = Router();

// Public: Create order
orderRouter.post("/", createOrder);

// Protected (Admin): Get all orders
orderRouter.get("/", auth, getAllOrders);

export default orderRouter;
