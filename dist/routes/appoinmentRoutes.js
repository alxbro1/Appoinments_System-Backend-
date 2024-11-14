"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appoinmentRouter = void 0;
const express_1 = require("express");
const appoinment_1 = require("../controllers/appoinment");
const asyncErrorVerifier_1 = __importDefault(require("../utils/asyncErrorVerifier"));
const appoimentDataValidations_1 = __importDefault(require("../middlewares/appoimentDataValidations"));
exports.appoinmentRouter = (0, express_1.Router)();
exports.appoinmentRouter.post('/schedule', appoimentDataValidations_1.default, (0, asyncErrorVerifier_1.default)(appoinment_1.create));
exports.appoinmentRouter.put('/cancel/:id', (0, asyncErrorVerifier_1.default)(appoinment_1.cancel));
exports.appoinmentRouter.get("/getbyuser/:id", (0, asyncErrorVerifier_1.default)(appoinment_1.getByUserCont));
exports.appoinmentRouter.get('/:id', (0, asyncErrorVerifier_1.default)(appoinment_1.getOne));
exports.appoinmentRouter.get('/', (0, asyncErrorVerifier_1.default)(appoinment_1.getAll));
