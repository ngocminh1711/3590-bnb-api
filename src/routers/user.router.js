import express from 'express';
import { ChangePassword } from '../controllers/userController/user.controller';
const routerUser = express.Router()

routerUser.post('/change-password',ChangePassword)

export default routerUser