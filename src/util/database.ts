import { Sequelize } from "sequelize";

const sequelize = new Sequelize (process.env.DATABASENAME as string, process.env.DATABASEUSERID as string, process.env.DATABASEUSERPASSWORD as string,{
    dialect:"mssql",
    host: process.env.DATABASEHOST as string,
    port: 53558, // Default port 53558
    logging: false, // disable logging; default: console.log

    dialectOptions: {
        requestTimeout: 30000 // timeout = 30 seconds
    }
})

// console.log(process.env.DATABASENAME)
// 
// 
// 

// const sequelize = new Sequelize ( process.env.DATABASENAME as string, process.env.DATABASEUSERID as string, process.env.DATABASEUSERPASSWORD as string ,{
//     dialect:"mysql",
//     host: process.env.DATABASEHOST as string,     
// })

export default sequelize;