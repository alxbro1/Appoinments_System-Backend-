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
const data_source_1 = require("../config/data-source");
const user_1 = require("../entities/user");
const credentialsRepository_1 = __importDefault(require("./credentialsRepository"));
exports.default = data_source_1.AppDataSource.getRepository(user_1.User).extend({
    registerUser: function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = data_source_1.AppDataSource.createQueryRunner();
            console.log(data);
            try {
                yield queryRunner.connect();
                queryRunner.startTransaction();
                const newCredential = credentialsRepository_1.default.create({
                    password: data.password,
                    username: data.username,
                });
                yield queryRunner.manager.save(newCredential);
                if (!newCredential)
                    throw Error("Credentials not found");
                console.log("clg2");
                data.credential = newCredential;
                const newUser = this.create(data);
                yield queryRunner.manager.save(newUser);
                console.log("clg3");
                yield queryRunner.commitTransaction();
                return newUser;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw Error("User not succesfuly Created");
            }
            finally {
                yield queryRunner.release();
            }
        });
    },
    findById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.findOne({
                where: { id },
                relations: ["appointments"],
            });
            if (!data)
                throw Error("User not found");
            return data;
        });
    },
    checkIfExist: function (username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({
                where: {
                    credential: { username: username, password: password },
                },
                relations: ["appointments"],
            });
            if (!user)
                return false;
            return user;
        });
    },
    verifyAccount: function (token) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield this.update({ confirmationToken: token }, { isVerified: true, confirmationToken: "" });
            if (update.affected === 0)
                throw Error("this verification token is deprecated or invalid");
            return update.raw;
        });
    },
});
