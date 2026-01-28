"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminSchema_1 = __importDefault(require("../models/AdminSchema"));
const loginAdmin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const admin = await AdminSchema_1.default.findOne({ userName }) || null;
        //check if admin exists
        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            return;
        }
        //compare password
        const isPasswordCorrect = await admin.comparedPassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        //create token
        const token = jsonwebtoken_1.default.sign({
            id: admin._id,
            userName: admin.userName,
            role: admin.role,
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "Login successful",
            token: `Bearer ${token}`,
            admin: {
                id: admin._id,
                userName: admin.userName,
                email: admin.email,
                role: admin.role
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginAdmin = loginAdmin;
//# sourceMappingURL=loginAdmin.js.map