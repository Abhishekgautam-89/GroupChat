"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASENAME, process.env.DATABASEUSERID, process.env.DATABASEUSERPASSWORD, {
    dialect: "mssql",
    host: process.env.DATABASEHOST,
    port: 53558,
    logging: false,
    dialectOptions: {
        requestTimeout: 30000 // timeout = 30 seconds
    }
});
// console.log(process.env.DATABASENAME)
// 
// 
// 
// const sequelize = new Sequelize ( process.env.DATABASENAME as string, process.env.DATABASEUSERID as string, process.env.DATABASEUSERPASSWORD as string ,{
//     dialect:"mysql",
//     host: process.env.DATABASEHOST as string,     
// })
exports.default = sequelize;
