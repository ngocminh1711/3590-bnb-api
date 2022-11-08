import bcrypt from "bcrypt";
import User from "../../models/userSchesma/user.js";
import jwt from "jsonwebtoken";

let secretKey = "huydo";

class AuthController {
  login = async (req, res) => {
    let loginForm = req.body;
    let user = await User.findOne({
      username: loginForm.username,
    });
    if (!user) {
      res.status(401).json({
        message: "User isn't existed !!",
      });
    } else {
      let comparePassword = await bcrypt.compare(
        loginForm.password,
        user.password
      );
      if (!comparePassword) {
        res.status(401).json({
          message: "Password is wrong !!",
        });
      } else {
        let payload = {
          id: user._id,
          username: user.username,
          name: req.body.name,
          email: user.email,
          image: user.image,
          backdrop_Image: user.backdrop_Image,
          role: user.role,
          phone: user.phone,
          address: user.address,
        };
        let accessToken = await jwt.sign(payload, secretKey, {
          expiresIn: 36000,
        });
        res.status(200).json({
          token: accessToken,
        });
      }
    }
  };
}

export default AuthController;
