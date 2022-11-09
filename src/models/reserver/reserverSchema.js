import mongoose, { Schema } from "mongoose";

const reseverSchema = new Schema({
  houseId: String,
  tenantId: String,
  checkInDay: Date,
  checkOutDay: Date,
  totalMoney: Number,
  // bookingStatus:
});

const Resever = mongoose.model("Resever", reseverSchema);
export default Resever;
