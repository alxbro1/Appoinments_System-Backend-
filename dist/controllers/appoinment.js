"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.create = exports.getByUserCont = exports.getOne = exports.getAll = void 0;
const getAllAppoinments_1 = require("../services/appoinment/getAllAppoinments");
const getAppoinmentById_1 = require("../services/appoinment/getAppoinmentById");
const createAppoinment_1 = require("../services/appoinment/createAppoinment");
const cancelledAppoiment_1 = require("../services/appoinment/cancelledAppoiment");
const getAppoinmentByUser_1 = require("../services/appoinment/getAppoinmentByUser");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, getAllAppoinments_1.getAllUsers)()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(404).json({ message: err.message });
    });
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, getAppoinmentById_1.getById)(Number(id))
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(404).json({ err });
    });
});
exports.getOne = getOne;
const getByUserCont = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield (0, getAppoinmentByUser_1.getByUser)(Number(id));
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getByUserCont = getByUserCont;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { time, date, userId } = req.body;
    const user = Number(userId);
    (0, createAppoinment_1.CreateAppoinment)({ time, date, user })
        .then((result) => {
        res
            .status(201)
            .json({ message: "appoinment created", appoiment: result });
    })
        .catch((err) => {
        res.status(404).json({ message: err.message });
    });
});
exports.create = create;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cancelledAppoiment_1.CancelledAppoinment)(Number(req.params.id))
        .then((result) => {
        res.status(200).json({ result: true });
    })
        .catch((err) => {
        res.status(404).json({ result: false, message: err.message });
    });
});
exports.cancel = cancel;
