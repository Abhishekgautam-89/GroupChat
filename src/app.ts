import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import Sequelize from "./util/database";
import userRoute from './routes/user'


const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["PUT", 'POST', 'DELETE', 'GET']
}));
app.use(bodyParser.json())
app.use('/user', userRoute);


Sequelize
// .sync({force: true})
.sync()
.then(()=>app.listen(3000))
.catch((err:any)=>console.log(err));