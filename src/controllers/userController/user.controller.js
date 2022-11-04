import User from "../../models/userSchesma/user.js";
import bcrypt from "bcryptjs";
export const ChangePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (isCorrect) {
        const newPassword = bcrypt.hash(req.body.password, [10]);
        await User.updateOne({ password: newPassword });
        res.status(200).json("change success");
      }
      else{
        res.status(200).json("change failed")
      }
    }
  } catch (err) {
    res.status(403).json("change failed");
  }
};
export const UpdateProfileUser = async (req, res, next) => {};
