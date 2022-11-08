import mongoose, {Schema} from "mongoose";


const houseStatusSchema = new Schema(
    {
        name: String,
    })

const houseStatus = mongoose.model('houseStatus', houseStatusSchema)
export default houseStatus;