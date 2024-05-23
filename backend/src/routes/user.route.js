import express from 'express'
import { login, register, getAllUsers, verifyEmail, resendOtp } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/verify", verifyEmail)
userRouter.post("/resend", resendOtp)
userRouter.post("/login", login)
userRouter.get("/", getAllUsers)

export {userRouter}