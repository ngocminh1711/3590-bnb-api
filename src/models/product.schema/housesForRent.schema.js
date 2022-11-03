import mongoose, {Schema} from "mongoose";


const housesForRentSchema = new Schema(
    {
        name: String,
        address: String,
        status:{type:String,default:"empty"},
        typeRoom: {type: Schema.Types.ObjectId, ref: 'TypeRoom'},
        numberOfBedrooms: Number,
        numberOfBathrooms: Number,
        roomRates: Number,
        description: String,
        image_backdrop: String,
        image_view: [],
        numberOfTenants: Number,
    })

const HouseForRent = mongoose.model('HouseForRent', housesForRentSchema)
export default HouseForRent;