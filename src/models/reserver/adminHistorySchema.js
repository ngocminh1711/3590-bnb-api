import mongoose, { Schema } from "mongoose";

const adminHistorySchema = new Schema({
  houseId: String,
  tenantId: String,
  userId: String,
  checkInDay: Date,
  checkOutDay: Date,
  totalMoney: Number,
  houseName: String,
  bookingStatus: String,
  bookingId:String
});

const AdminHistory = mongoose.model("AdminHistory", adminHistorySchema);
export default AdminHistory;