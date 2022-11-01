import express from "express"
import { Register } from "../../controllers/authController/auth.js"

const Routes = express.Router()

Routes.post("/register",Register)

export default Routes