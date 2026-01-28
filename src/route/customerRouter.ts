import { Router } from "express";
import { getAllCustomers } from "../controllers/customerController";
import { auth } from "../middlewares/auth";

const customerRouter = Router();

// Protected (Admin): Get all customers
customerRouter.get("/", auth, getAllCustomers);

export default customerRouter;
