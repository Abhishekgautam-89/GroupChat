
import user from "../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Sequelize = require("sequelize");

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
                    Phone: body.phone
                },
                defaults: {
                    Name: body.name,
                    Password: hash
                }
            })
            if (created) {
                res.status(201).json({ userStatus: true, message: "New-User Created" })
            }
            else {
                // res.status(201).json({ userStatus: true, message: "Email-Id or Phone Number already exists" });
                throw ("Email-Id or Phone Number already exists");
            }
        })
    }
    catch (err) {
        console.log(err);
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
            res.status(201).json({Message: "Login Successful", token: jwtToken(loginUser[0].dataValues.Sr_no as string, loginUser[0].dataValues.Email as string)})
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

function jwtToken(id : string, email: string){
return jwt.sign({id, email}, process.env.SECRETkEY as jwt.Secret)
}
export default { registerUser, login }

