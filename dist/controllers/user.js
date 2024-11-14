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
exports.verify = exports.register = exports.login = exports.getOne = exports.getAll = void 0;
const getAllUsers_1 = require("../services/user/getAllUsers");
const getUserById_1 = require("../services/user/getUserById");
const registerUser_1 = require("../services/user/registerUser");
const logInService_1 = require("../services/user/credentials/logInService");
const verifyUser_1 = require("../services/user/verifyUser");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, getAllUsers_1.getAllUsers)();
    res.json(data);
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    (0, getUserById_1.getById)(id)
        .then((result) => res.json(result))
        .catch(() => res.status(404).json({ message: "User not fund" }));
});
exports.getOne = getOne;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield (0, logInService_1.LogInService)(req.body);
    if (match)
        return res.status(200).json({ login: true, user: match });
    res.status(400).json({ login: false, user: {} });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, registerUser_1.RegisterUser)(req.body)
        .then((response) => res.status(201).json({ response }))
        .catch((err) => {
        res.status(400).json(err);
    });
});
exports.register = register;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyUser_1.verifyUserByToken)(req.params.token)
        .then((result) => {
        res.status(200).json({ message: "user verificated succefuly" });
    })
        .catch((err) => {
        res.status(400).json({ message: err.message });
    });
});
exports.verify = verify;
