import express from 'express';
import { ChangePassword, getProfileUser, editProfileUser } from '../controllers/userController/user.controller';
const routerUser = express.Router()

routerUser.post('/change-password',ChangePassword)
// routerUser.post('/edit-profile/:id', UpdateProfileUser)
routerUser.get('/:id', getProfileUser)
routerUser.patch('/edit/:id', editProfileUser)

export default routerUser