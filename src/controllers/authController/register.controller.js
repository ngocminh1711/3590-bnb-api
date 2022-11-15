import bcrypt from "bcrypt";
import User from "../../models/userSchesma/user.js";
export const Register = async (req, res, next) => {
  try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password:hash
      });
      if(!newUser){
      await newUser.save();
      res.status(200).json({ success: true, data: newUser });
      }
      else{res.status(403).json({ success: false, data:"register failed"})}
      
  } catch (err) {
            res.status(500).json({message:err.message})
  }
};