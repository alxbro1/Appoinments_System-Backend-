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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../config/envs");
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "localhost",
    port: 587,
    secure: false,
    auth: {
        user: envs_1.EMAIL_USER,
        pass: envs_1.EMAIL_PASSWORD,
    },
});
exports.default = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://appoinments-system-backend.vercel.app/users/confirm/${token}`;
    yield transporter.sendMail({
        from: "Sauron eje <alesauro30@gmail.com>",
        to: email,
        subject: "Confirm your email",
        text: `Click the link below to confirm your account: ${url}`,
        html: `<a href="${url}">Confirm your email</a>`,
    });
});
