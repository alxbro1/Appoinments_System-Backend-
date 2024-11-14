"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const credencials_1 = require("../entities/credencials");
exports.default = data_source_1.AppDataSource.getRepository(credencials_1.Credential).extend({});
