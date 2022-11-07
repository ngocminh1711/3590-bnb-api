import User from "../../models/userSchesma/user.js";
import bcrypt from "bcryptjs";
import UserGoogle from "../../models/userSchesma/userGoogle.js";

export const ChangePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (isCorrect) {
        const newPassword = bcrypt.hash(req.body.password, [10]);
        await User.updateOne({ password: newPassword });
        res.status(200).json("change success");
      } else {
        res.status(200).json("change failed");
      }
    }
  } catch (err) {
    res.status(403).json("change failed");
  }
};
export const editProfileUser = async (req, res, next) => {
  try{
    let id = req.params.id;
    let data = req.body;
      let user = await UserGoogle.findByIdAndUpdate(id, data) ||await User.findByIdAndUpdate(id, data);
      return res.status(200).json({
        message: "update success"
      })
  }catch(err){
    res.status(401).json({
      message: "change failed"
    })
  }
};

export const getProfileUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user =
      await UserGoogle.findOne({ _id: id }) || await User.findOne({ _id: id });
    return res.status(200).json({
      status: "success",
      message: "Get user information successful",
      data: user,
    });
  } catch {
    res.json({
      status: 'error',
      message: 'Get user information failure'
  })
  }
};
