"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const asyncErrorVerifier_1 = __importDefault(require("../utils/asyncErrorVerifier"));
const userDataValidations_1 = __importDefault(require("../middlewares/userDataValidations"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/login", (0, asyncErrorVerifier_1.default)(user_1.login));
exports.userRouter.post("/register", userDataValidations_1.default, (0, asyncErrorVerifier_1.default)(user_1.register));
exports.userRouter.get("/", (0, asyncErrorVerifier_1.default)(user_1.getAll));
exports.userRouter.get("/confirm/:token", (0, asyncErrorVerifier_1.default)(user_1.verify));
exports.userRouter.get("/:id", (0, asyncErrorVerifier_1.default)(user_1.getOne));
