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
                res.status(201).json({ userStatus: true, message: "Email-Id or Phone Number already exists" });
            }
        })
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ userStatus: false })
    }
}
export default { registerUser }