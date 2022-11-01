import bcrypt from "bcrypt";
import User from "../../models/userSchesma/user.js";
export const Register = async (req, res, next) => {
  try {
    let arrpassword = req.body.password;
    if (arrpassword[0] === arrpassword[1]) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password[0], salt);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      console.log(newUser);
      await newUser.save();
      res.status(200).json({ success: true, data: newUser });
    } else {
      res.status(400, "register failed");
    }
  } catch (err) {
    console.log(err);
  }
};
