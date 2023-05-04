import sequelize from "../util/database";
import Sequelize from "sequelize";

const User = sequelize.define('user',{
    Sr_no:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Phone:{
        type: Sequelize.BIGINT,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default User;