import mongoose, { Schema } from "mongoose";

const reseverSchema = new Schema({
  house: { type: Schema.Types.ObjectId, ref: 'HouseForRent' },
  tenant: { type: Schema.Types.ObjectId, ref: 'User'},
  checkInDay: Date,
  checkOutDay: Date,
  totalMoney: Number,
  // bookingStatus:
});

const Resever = mongoose.model("Resever", reseverSchema);
export default Resever;
