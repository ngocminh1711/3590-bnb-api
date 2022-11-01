import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';

let secretKey = 'huydo'

class AuthController {
    login = async(req,res) => {
        let loginForm = req.body;
        console.log(loginForm);
        let user = await User.findOne({
            username : loginForm.username,
        });
        if(!user){
            res.status(401).json({
                message: "User isn't existed !!"
            })
        }else{
            let comparePassword = await bcrypt.compare(loginForm.password, user.password);
            if(!comparePassword){
                res.status(401).json({
                    message : "Password is wrong !!"
                })
            }else{
                let payload = {
                    username: user.username,
                    role: user.role
                }
                let accessToken = await jwt.sign(payload, secretKey, {
                    expiresIn: 36000
                });
                res.status(200).json({
                    token: accessToken
                })
            }
        }
    }
}

export default AuthController;