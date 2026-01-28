"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminSchema_1 = __importDefault(require("../models/AdminSchema"));
const mongodb_1 = __importDefault(require("../config/mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//creating an admin inside the database
const createAdmin = async () => {
    try {
        console.log("creating admin");
        await (0, mongodb_1.default)();
        //check if member already exists
        const existingAdmin = await AdminSchema_1.default.findOne({
            email: "gabrielagyemanduah@gmail.com",
        });
        if (existingAdmin) {
            console.log("admin already exists");
            return;
        }
        const newAdmin = new AdminSchema_1.default({
            userName: "Gabriel Agyeman Duah",
            email: "gabrielagyemanduah@gmail.com",
            password: "Gabbyduah055$",
            role: "admin",
        });
        await newAdmin.save();
        console.log("Admin created successfully");
    }
    catch (error) {
        console.log("error creating admin", error);
    }
};
createAdmin();
//# sourceMappingURL=sendAdmin.js.map