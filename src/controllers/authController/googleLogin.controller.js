import bcrypt from "bcrypt";
import User from "../../models/userSchesma/user.js";
import jwt from "jsonwebtoken";
import UserGoogle from "../../models/userSchesma/userGoogle.js";

let secretKey = "huydo";

class GoogleLoginController {
  loginGoogle = async (req, res, next) => {
    try {
      console.log(req.body);
      let data = {
        username: req.body.name,
        name: req.body.name,
        email: req.body.email,
        google_id: req.body.sub,
        image: req.body.picture,
        role: "user",
        email_verify: req.body.email_verified,
        phone: "",
        address: "",
      };
      let user = await UserGoogle.findOne({
        google_id: data.google_id,
      });

      if (user) {
        let payload = {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          image: user.picture,
          role: user.role,
          phone: user.phone,
          address: user.address
        };
        let accessToken = jwt.sign(payload, secretKey, {
          expiresIn: 36000,
        });
        const response = {
          token: accessToken,
        };
        return res.status(200).json({
          message: "Login success",
          data: response,
        });
      } else {
        let newData = await UserGoogle.create(data, (err) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
          } else {
            let payload = {
              username: req.body.name,
              name: req.body.name,
              email: req.body.email,
              image: req.body.picture,
              role: req.body.role,
              phone: "",
              address: "",
            };
            let accessToken = jwt.sign(payload, secretKey, {
              expiresIn: 36000,
            });
            const response = {
              token: accessToken,
            };
            return res.status(200).json({
              message: "Login success",
              data: response,
            });
          }
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
}

export default GoogleLoginController;
