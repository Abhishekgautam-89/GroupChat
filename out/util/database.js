"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('trial', 'sa', '123456', {
    dialect: "mssql",
    host: "localhost",
    port: 50701,
    logging: false,
    dialectOptions: {
        requestTimeout: 30000 // timeout = 30 seconds
    }
});
exports.default = sequelize;
