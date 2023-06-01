import user from "../models/user";
import message from '../models/messages';
import { Op } from "sequelize";

interface body { 
    Message: string
} 

const addMessage = async (req : any,res: any)=>{
    const body  = req.body as body
    const user = req.user;
    try{
        const message = await user.createMessage({
            Message: body.Message
        })
        res.status(201).json({message: "Successfully Added", data: message})
    }
    catch(err){
        console.log(err);
        res.status(401).json({message: err})
    }
}

const getMessage = async(req:any, res: any)=>{
    try{
        // await message.sync({force:true})
       
        const msgId = req.query.msgId || 0;
        const previousMessages = await message.findAll({
            include:{
                model: user,
                // as: Name,
                attributes: ['Name', 'Sr_no']
            },
            where:{
                Sr_no:{[Op.gt]: msgId}
            }
        })
        // console.log(previousMessages);
        res.status(201).json({message: previousMessages})
    }
    catch (err){
        console.log(err);
        res.status(401).json({message: err})
    }
}

export default{addMessage, getMessage};