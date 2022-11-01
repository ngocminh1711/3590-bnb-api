import mongoose, {Schema} from "mongoose";


const typeRoomsSchema = new Schema(
    {
        name: String,
    })

const TypeRoom = mongoose.model('TypeRoom', typeRoomsSchema)
export default TypeRoom;