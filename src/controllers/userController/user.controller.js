import User from "../../models/userSchesma/user.js";
import bcrypt from "bcryptjs";
export const ChangePassword = async (req, res, next) => {
    
  const user = await User.findOne({ _id: req.params.id});
  
  try {
    if (user) {
      const isCorrect = bcrypt.compareSync(req.body.currentPassword, user.password);  
      if (isCorrect) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await User.findOneAndUpdate({_id:req.params.id},{ password: newPassword });
        res.status(200).json("change success");
        console.log(newPassword)
      }
      else{
        res.status(200).json("change failed")
      }
    }
  } catch (err) {
    res.status(403).json("change failed");
  }
//   const user_id = req.params.id;
//         const data = req.body
//         const user = await User.findOne({ _id: user_id })
//         try {
//             if (user) {
//                 if (data.currentPassword == user.password) {
//                     await UserModel.findOneAndUpdate({ _id: user_id }, { password: data.N })
//                     res.status(200).json({type:'success', message: 'Change password success!'})
//                 } else {
//                     res.status(200).json({type:'error', message: 'Wrong old password! '})
//                 }
//             } else {
//                 res.status(200).json({type: 'notexist', message: 'Not exist user!'})
//             }
//         } catch (err) {
//             res.status(500).json('Server error')
//         }
};
export const UpdateProfileUser = async (req, res, next) => {};
