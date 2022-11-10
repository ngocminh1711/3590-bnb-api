import mongoose, { Schema } from "mongoose";

const reseverSchema = new Schema({
  houseId: String,
  tenantId: String,
  checkInDay: Date,
  checkOutDay: Date,
  totalMoney: Number,
  houseName: String,
  image: String
  // bookingStatus:
});

const Resever = mongoose.model("Resever", reseverSchema);
export default Resever;