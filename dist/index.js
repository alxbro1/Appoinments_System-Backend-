"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const data_source_1 = require("./config/data-source");
data_source_1.AppDataSource.initialize().then(() => {
    server_1.default.listen(3000, () => {
        console.log(`server is listening on port ${3000}`);
    });
});
