import express from "express";
import {
  ChangePassword,
  getProfileUser,
  editProfileUser,
  like,
  dislike,
} from "../controllers/userController/user.controller";

const routerUser = express.Router();
routerUser.put("/change-password/:id", ChangePassword);
routerUser.post("/change-password", ChangePassword);
// routerUser.post('/edit-profile/:id', UpdateProfileUser)
routerUser.get("/:id", getProfileUser);
routerUser.patch("/edit/:id", editProfileUser);

routerUser.put("/like/:houseForRentId", like);
routerUser.put("/dislike/:houseForRentId", dislike);
export default routerUser;
