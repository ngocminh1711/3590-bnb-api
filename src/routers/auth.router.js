import express from "express";
import GoogleLoginController from "../controllers/authController/googleLogin.controller.js";
import AuthController from "../controllers/authController/login.controller.js";
import { Register } from "../controllers/authController/register.controller.js";

const authRouter = express.Router();
const authController = new AuthController();
const googleLogin = new GoogleLoginController();

authRouter.post('/login',authController.login);
authRouter.post('/register',Register);
authRouter.post('/login/google', googleLogin.loginGoogle)

export default authRouter;

// add something