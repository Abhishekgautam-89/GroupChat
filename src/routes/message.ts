import { Router } from "express";
import messageController from '../controller/message'
import authentication from '../middleware/tokenUthenticate'

const router = Router();


router.post('/new',authentication.authenticate ,messageController.addMessage ) ;
router.get('/get',authentication.authenticate, messageController.getMessage);

export default router;