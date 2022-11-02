import mongoose, {Schema} from "mongoose";


const housesForRentSchema = new Schema(
    {
        name: String,
        address: String,
        typeRoom: {type: Schema.Types.ObjectId, ref: 'TypeRoom'},
        numberOfBedrooms: Number,
        numberOfBathrooms: Number,
        roomRates: Number,
        description: String,
        image_backdrop: String,
        image_view: [],
    })

const HouseForRent = mongoose.model('HouseForRent', housesForRentSchema)
export default HouseForRent;