import User from "../../models/userSchesma/user.js";
import bcrypt from "bcryptjs";
import UserGoogle from "../../models/userSchesma/userGoogle.js";

export const ChangePassword = async (req, res, next) => {
    
  const user = await User.findOne({ _id: req.params.id});
   console.log(user)
  try {
    if (user) {
      const isCorrect = bcrypt.compareSync(req.body.currentPassword, user.password);
      console.log(isCorrect)
      if (isCorrect) {
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);
        
        console.log(req.body.newPassword)
        
        await User.findOneAndUpdate({_id:req.params.id},{ password: newPassword });
        res.status(200).json({ success: true, data: newPassword });
        console.log(newPassword)
      }
      else{
        console.log(2)
        res.status(200).json("change failed")
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
export  const like=async(req,res)=> {
  const userId = req.user.id
  const houseForRentId = req.params.houseForRentId
  try{
      await HouseForRent.findByIdAndUpdate(houseForRentId,{
        $addtoSet:{likes :userId},
        $pull:{dislikes:userId}
      })
    res.status(200).json("like success")
  }
  
  catch (err) {
    res.status(404).json({
      status: "error",
      message: "houseForRent not found ",
    });
  }
}
export  const dislike=async(req,res)=> {
const userId = req.user.id
const houseForRentId = req.params.houseForRentId
try{
    await HouseForRent.findByIdAndUpdate(houseForRentId,{
      $addtoSet:{dislikes :userId},
      $pull:{likes:userId}
    })
  res.status(200).json("like success")
}

catch (err) {
  res.status(404).json({
    status: "error",
    message: "houseForRent not found ",
  });
}
}
