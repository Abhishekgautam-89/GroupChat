import { Router } from "express";
import userRoute from '../controller/user';
import authentication from "../middleware/tokenUthenticate";

const router = Router();


router.post('/new', userRoute.registerUser)
router.post('/login', userRoute.login);
router.get('/',authentication.authenticate ,userRoute.getUser);

export default router;