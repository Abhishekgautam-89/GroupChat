import { Router } from "express";
import userRoute from '../controller/user'

const router = Router();


router.post('/new', userRoute.registerUser)
router.post('/login', userRoute.login);

export default router;