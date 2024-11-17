import express from 'express';
import { registerUser,loginUser } from '../controllers/user.js'; // Adjust the path as needed

const userRouter = express.Router();

userRouter.post('/registerUser', registerUser);
userRouter.post('/loginUser',loginUser);


export default userRouter;
