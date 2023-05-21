import sequelize from "../util/database";
import Sequelize from "sequelize";

const Message = sequelize.define('message',{
    Sr_no:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Message: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
})

export default Message;