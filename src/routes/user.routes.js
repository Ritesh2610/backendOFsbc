import { Router } from "express";
import * as userController from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRoute=Router();

userRoute.post('/register', userController.userRegister)
userRoute.post('/login', userController.userLogin)

// secure routes 
userRoute.post('/logout', verifyJWT, userController.logoutUser)

export default userRoute