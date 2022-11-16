import express from "express";
import {
    ChangePassword,
    getProfileUser,
    editProfileUser,
    like,
    dislike, editAvatar,
} from "../controllers/userController/user.controller.js";

const routerUser = express.Router();
routerUser.put("/change-password/:id", ChangePassword);
routerUser.get("/:id", getProfileUser);
routerUser.patch("/edit/:id", editProfileUser);

routerUser.put("/like/:houseForRentId", like);
routerUser.put("/dislike/:houseForRentId", dislike);

routerUser.patch('/editAvatar/:id', editAvatar)
export default routerUser;
