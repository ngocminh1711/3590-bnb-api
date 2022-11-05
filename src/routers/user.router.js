import express from 'express';
import { ChangePassword } from '../controllers/userController/user.controller';
const routerUser = express.Router()
routerUser.put('/change-password/:id',ChangePassword)
export default routerUser