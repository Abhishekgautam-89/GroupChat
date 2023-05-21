
import user from "../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Sequelize = require("sequelize");
import { Op } from "sequelize";

interface requestBody {
    name: string;
    email: string;
    password: string;
    phone: BigInt
}


const registerUser = (req: any, res: any) => {
    const body = req.body as requestBody;
    // console.log(body);
    const salt = 15
    try {
        bcrypt.hash(body.password, salt, async (err, hash) => {
            const [newUser, created] = await user.findOrCreate({
                where: {
                    Email: body.email,
                    // Phone: body.phone
                },
                defaults: {
                    Name: body.name,
                    Password: hash,
                    Phone: body.phone
                }
            })
            if (created) {
                res.status(201).json({ userStatus: true, message: "New-User Created" })
            }
            else {
                res.status(201).json({ userStatus: false, message: "Email-Id or Phone Number already exists" });
                // throw ("Email-Id or Phone Number already exists");
            }
        })
    }
    catch (err) {
        console.log("register>>",err);
        res.status(401).json({ userStatus: false, message: err })
    }
}

const login = async (req: any, res: any) => {
    const body = req.body as requestBody;
    // console.log(body)
    try{
        const loginUser = await user.findAll({
            where:{
                Email: body.email
            }
        })
        if(loginUser.length>0){ 
        const test  = await bcrypt.compare(body.password, loginUser[0].dataValues.Password)
        if(test){
            res.status(201).json({Message: "Login Successful", token: jwtToken(loginUser[0].dataValues.Sr_no as string, loginUser[0].dataValues.Email as string, loginUser[0].dataValues.Name as string )})
        }
        else {
            // throw ('Entered Email-id or Password is incorrect!')
        res.status(401).json({message:"User not authorized"})
    }
    }
    else{
        // throw ("User not found")
        res.status(404).json({message:"User not found"})
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err})
    }

}
const getUser = async (req: any, res: any) => {
    const loginUser = req.user;
    try {
        const allUsers = await user.findAll({
            where: {
                Sr_no: { [Op.ne]: [loginUser.Sr_no] }
            }
        })
        // user.sync({force:true})
        res.status(201).json({data: allUsers})
    }
    catch (err) {
        console.log(err)
        res.status(401).json({data:err})
    }
}

function jwtToken(id : string, email: string, name: string){
return jwt.sign({id, email, name}, process.env.SECRETkEY as jwt.Secret)
}
export default { registerUser, login, getUser }

