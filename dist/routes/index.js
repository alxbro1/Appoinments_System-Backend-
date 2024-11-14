"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const appoinmentRoutes_1 = require("./appoinmentRoutes");
const userRoutes_1 = require("./userRoutes");
exports.router = (0, express_1.Router)();
exports.router.use('/turns', appoinmentRoutes_1.appoinmentRouter);
exports.router.use('/users', userRoutes_1.userRouter);
