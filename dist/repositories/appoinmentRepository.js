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
const appoinment_1 = require("../entities/appoinment");
const userRepository_1 = __importDefault(require("./userRepository"));
exports.default = data_source_1.AppDataSource.getRepository(appoinment_1.Appoinment).extend({
    createAppoinment: function (appoinment) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findById(appoinment.user);
            if (!user)
                throw Error('user not found');
            appoinment.status = 'active';
            const newAppoinment = yield this.create(appoinment);
            yield this.save(newAppoinment);
            return newAppoinment;
        });
    },
    cancelAppoinment: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield this.update(id, { status: 'cancelled' });
            if (update.affected === 0)
                throw Error("appoinment not found");
            return update.raw;
        });
    },
    findById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.findOneBy({ id });
            if (!data)
                throw Error('user not found');
            return data;
        });
    },
    findByUser: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield userRepository_1.default.findOne({
                where: { id },
                relations: ["appointments"],
            });
            if (!(data === null || data === void 0 ? void 0 : data.appointments))
                throw Error("User or Appoinments not found");
            return data.appointments;
        });
    }
});
