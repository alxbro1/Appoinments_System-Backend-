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
exports.RegisterUser = void 0;
const userRepository_1 = __importDefault(require("../../repositories/userRepository"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
const verifyEmail_1 = __importDefault(require("../../utils/verifyEmail"));
const RegisterUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newToken = (0, generateToken_1.default)();
    user.confirmationToken = newToken;
    const newUser = yield userRepository_1.default.registerUser(user);
    if (!newUser)
        throw Error("New User not found");
    yield (0, verifyEmail_1.default)(newUser.email, newToken);
    return newUser;
});
exports.RegisterUser = RegisterUser;
