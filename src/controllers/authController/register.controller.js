import bcrypt from "bcrypt";
import User from "../../models/userSchesma/user.js";
export const Register = async (req, res, next) => {
  try {
    let arrpassword = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:hash
      });
      await newUser.save();
      res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    console.log(err);
  }
};
