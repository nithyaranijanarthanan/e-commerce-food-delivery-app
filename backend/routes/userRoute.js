import express from 'express'
import { loginUser, registerUser, getUserProfile, logoutUser} from '../controllers/userController.js'
import authMiddleware from "../middleware/auth.js";


const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.post('/logout', logoutUser);

export default userRouter;
