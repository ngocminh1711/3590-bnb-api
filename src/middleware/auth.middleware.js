import { secretKey } from "../controllers/auth.controller.js";
import jwt from "jsonwebtoken";

class AuthMiddleware {
  verifyUserToken = (req, res, next) => {
    let Authorization = req.headers.authorization;
    if (Authorization) {
      let accessToken = Authorization.split(" ")[1];
      if (!accessToken) {
        res.status(401).json({
          message: "Unauthorization(1)",
        });
      } else {
        jwt.verify(accessToken, secretKey, (err, data) => {
          if (err) {
            res.status(401).json({
              error: err.message,
              message: "Unauthorization(2)",
            });
          } else {
            req.decoded = data;
            if (req.decoded.role === "user") {
              next();
            } else {
              res.status(401).json({
                message: "Unauthorization(3)",
              });
            }
          }
        });
      }
    }else{
        res.status(401).json({
            message: "Unauthenticated(4)",
          });
    }
  };
}

export default AuthMiddleware;
