import user from "../models/user";
import message from '../models/messages';

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

export default{addMessage};