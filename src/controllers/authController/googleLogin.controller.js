import User from "../../models/userSchesma/user.js";
import jwt from "jsonwebtoken";

let secretKey = "huydo";

class GoogleLoginController {
  loginGoogle = async (req, res, next) => {
    let data = {
      username: req.body.name,
      name: req.body.name,
      email: req.body.email,
      google_id: req.body.sub,
      image: req.body.picture,
      backdrop_Image: req.body.backdrop_Image,
      role: req.body.role,
      email_verify: req.body.email_verified,
      phone: "",
      address: "",
    };
    try {
      let user = await User.findOne({
        google_id: data.google_id,
      });

      if (!user) {
        user = await User.create(data);
      }
      console.log(user)
      let accessToken = jwt.sign(user.toJSON(), secretKey, {
        expiresIn: 36000,
      });

      const response = {
        token: accessToken,
      };
      return res.status(200).json({
        message: "Login success",
        data: response,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
}

export default GoogleLoginController;
