import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";

import cors from 'cors';
import Sequelize from "./util/database";

import user from './models/user';
import messages from './models/messages';

import userRoute from './routes/user'
import messageRoute from './routes/message'


const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["PUT", 'POST', 'DELETE', 'GET']
}));
app.use(bodyParser.json())

user.hasMany(messages);
messages.belongsTo(user);

app.use('/user', userRoute);
app.use('/message', messageRoute);



Sequelize
// .sync({force: true})
.sync()
.then(()=>app.listen(3000))
.catch((err:any)=>console.log("sequelize>>>",err));