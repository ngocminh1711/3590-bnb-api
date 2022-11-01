import express from "express";
import AuthController from "../controllers/authController/login.controller.js";
import { Register } from "../controllers/authController/register.controller.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login',authController.login)
authRouter.post('/register',Register)

export default authRouter;

