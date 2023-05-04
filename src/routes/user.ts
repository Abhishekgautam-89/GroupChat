import { Router } from "express";
import userRoute from '../controller/user'

const router = Router();


router.post('/new', userRoute.registerUser)

export default router;