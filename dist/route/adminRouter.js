"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginAdmin_1 = require("../controllers/loginAdmin");
const adminRouter = (0, express_1.Router)();
//post route to login
adminRouter.post("/login", loginAdmin_1.loginAdmin);
exports.default = adminRouter;
//# sourceMappingURL=adminRouter.js.map