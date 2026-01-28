"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["superAdmin", "admin"],
        default: "admin"
    }
});
//add password comparison method
adminSchema.methods.comparedPassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
//hashing the password
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
exports.default = mongoose_1.default.model("Admin", adminSchema);
//# sourceMappingURL=AdminSchema.js.map