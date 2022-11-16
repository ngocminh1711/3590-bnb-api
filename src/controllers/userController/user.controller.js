import User from "../../models/userSchesma/user.js";
import bcrypt from "bcryptjs";
import UserGoogle from "../../models/userSchesma/userGoogle.js";

export const ChangePassword = async (req, res, next) => {

    const user = await User.findOne({_id: req.params.id});
    try {
        if (user) {
            const isCorrect = bcrypt.compareSync(req.body.currentPassword, user.password);
            if (isCorrect) {
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(req.body.newPassword, salt);
                await User.findOneAndUpdate({_id: req.params.id}, {password: newPassword});
                res.status(200).json({success: true, data: newPassword});
            } else {
                res.status(403).json("change failed")
                console.log(1)
            }

        }
    } catch (err) {
        res.status(403).json("change failed");
    }
};
export const editProfileUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let user = await UserGoogle.findByIdAndUpdate(id, data) || await User.findByIdAndUpdate(id, data);
        return res.status(200).json({
            message: "update success"
        })
    } catch (err) {
        res.status(401).json({
            message: "change failed"
        })
    }
};

export const getProfileUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserGoogle.findOne({_id: id}) || await User.findOne({_id: id});
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
export const like = async (req, res) => {
    const userId = req.user.id
    const houseForRentId = req.params.houseForRentId
    try {
        await HouseForRent.findByIdAndUpdate(houseForRentId, {
            $addtoSet: {likes: userId},
            $pull: {dislikes: userId}
        })
        res.status(200).json("like success")
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: "houseForRent not found ",
        });
    }
}
export const dislike = async (req, res) => {
    const userId = req.user.id
    const houseForRentId = req.params.houseForRentId
    try {
        await HouseForRent.findByIdAndUpdate(houseForRentId, {
            $addtoSet: {dislikes: userId},
            $pull: {likes: userId}
        })
        res.status(200).json("like success")
    } catch (err) {
        res.status(404).json({
            status: "error",
            message: "houseForRent not found ",
        });
    }
}

export const editAvatar = async (req, res) => {
    try{
        const userId = req.params.id;
        const avatarUrl = req.body.avatarUrl;
        let data =  await User.findByIdAndUpdate(userId,{ image: avatarUrl })
        return res.status(200).json({ message: "edit successfully", data: data })
    }
    catch (err) {
        return res.status(404).json({ message: err.message})
    }
}
