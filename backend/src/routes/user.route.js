import express from 'express'
import { login, register, getAllUsers, verifyEmail } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/verify", verifyEmail)
userRouter.post("/login", login)
userRouter.get("/", getAllUsers)

export {userRouter}