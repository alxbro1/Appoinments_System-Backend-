"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appoinment = void 0;
const user_1 = require("./user");
const typeorm_1 = require("typeorm");
let Appoinment = class Appoinment {
};
exports.Appoinment = Appoinment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Appoinment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appoinment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 10
    }),
    __metadata("design:type", String)
], Appoinment.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (users) => users.appointments),
    __metadata("design:type", Number)
], Appoinment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appoinment.prototype, "status", void 0);
exports.Appoinment = Appoinment = __decorate([
    (0, typeorm_1.Entity)({
        name: 'appointments'
    })
], Appoinment);
