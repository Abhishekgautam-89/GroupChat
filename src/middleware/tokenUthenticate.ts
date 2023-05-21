import jwt from "jsonwebtoken";
import { JwtPayload } from 'jsonwebtoken'
import users from '../models/user';

interface token {
    id :number;
    email: string;
    name: string;
}

const authenticate = async(req:any, res:any, next:any )=>{
    const token = req.header('Authorization');
    console.log("token>>",token)
    try{
       const userValue= jwt.verify(token as string, process.env.SECRETkEY as jwt.Secret) as JwtPayload;
       console.log(userValue)
       const user = await users.findByPk(userValue.id as number);
       if(user){
        req.user = user
        next()
       }
       else{
        throw('Token Expired')
       }

    }

    catch(err){
        res.status(401).json({message: err})
    }
}

export default {authenticate};