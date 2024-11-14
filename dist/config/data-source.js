"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const credencials_1 = require("../entities/credencials");
const appoinment_1 = require("../entities/appoinment");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: envs_1.POSTGRES_URL,
    dropSchema: false,
    synchronize: true,
    logging: false,
    entities: [user_1.User, credencials_1.Credential, appoinment_1.Appoinment],
    subscribers: [],
    migrations: [],
});
