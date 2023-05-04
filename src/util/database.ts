import { Sequelize } from "sequelize";

const sequelize = new Sequelize ('trial', 'sa', '123456',{
    dialect:"mssql",
    host: "localhost",
    port: 50701, // Default port 53558
    logging: false, // disable logging; default: console.log

    dialectOptions: {
        requestTimeout: 30000 // timeout = 30 seconds
    }
})

export default sequelize;