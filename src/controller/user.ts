import { throws } from "assert";
import user from "../models/user";
import bcrypt from "bcrypt";
import Sequelize = require("sequelize");

interface requestBody {
    name: string;
    email: string;
    password: string;
    phone: BigInt
}


const registerUser = async (req: any, res: any) => {
    const body = req.body as requestBody;
    // console.log(body);
    const saltRounds = 10
    try {
        // bcrypt.hash(body.password, salt, async (err, hash) => {
        //     hashPassword = hash;
        // })
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(body.password, salt);
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

    }
    catch (err) {
        // console.log(err);
        res.status(401).json({ userStatus: false, message: err })
    }
}

const login = async (req: any, res: any) => {
    const body = req.body as requestBody;
    console.log(body)
    try{
        const loginUser = await user.findAll({
            where:{
                Email: body.email
            }
        })
        const test  = await bcrypt.compare(body.password, loginUser[0].dataValues.Password)
        if(test){
            
        }
    }
    catch(err){
        console.log(err);
    }

}


export default { registerUser, login }