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
        numberOfTenants: Number,
        status: {type: Schema.Types.ObjectId, ref: 'houseStatus', default:'Ready to rent'}
    })

const HouseForRent = mongoose.model('HouseForRent', housesForRentSchema)
export default HouseForRent;