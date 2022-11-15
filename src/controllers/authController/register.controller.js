import bcrypt from "bcrypt";
import User from "../../models/userSchesma/user.js";
export const Register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const user = await User.find({email:req.body.email});
    const users = await User.find({username:req.body.username});
    console.log(user)
    console.log(users)
    if (user.length >0 || users.length >0) {
      console.log(1)
      res.status(401).json({ message: " failed" });
    } else {
      console.log(2)
      await newUser.save();
      res.status(200).json({ success: true, data: newUser });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
