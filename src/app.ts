import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import Sequelize from "./util/database";
import userRoute from './routes/user'

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use('/user', userRoute);


Sequelize
// .sync({force: true})
.sync()
.then(()=>app.listen(3000))
.catch((err:any)=>console.log(err));