import mongoose, { Schema } from "mongoose";

const housesForRentSchema = new Schema({
  userId:String,
  name: String,
  address: String,
  typeRoom: { type: Schema.Types.ObjectId, ref: "TypeRoom" },
  numberOfBedrooms: Number,
  renter: { type: String, default: "no renter" },
  numberOfBathrooms: Number,
  roomRates: Number,
  description: String,
  image_backdrop: String,
  image_view: [],
  numberOfTenants: Number,
  status: {
    type: Schema.Types.ObjectId,
    ref: "houseStatus",
  },
});

const HouseForRent = mongoose.model("HouseForRent", housesForRentSchema);
export default HouseForRent;