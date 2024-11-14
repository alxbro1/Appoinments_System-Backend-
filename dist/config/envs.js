"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.POSTGRES_URL = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.POSTGRES_URL = process.env.POSTGRES_URL;
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
