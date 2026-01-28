"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
const auth_1 = require("../middlewares/auth");
const customerRouter = (0, express_1.Router)();
// Protected (Admin): Get all customers
customerRouter.get("/", auth_1.auth, customerController_1.getAllCustomers);
exports.default = customerRouter;
//# sourceMappingURL=customerRouter.js.map