import mongoose, { Schema } from "mongoose";


const reseverSchema = new Schema({
    houseID: { type: Schema.Types.ObjectId, ref: "HouseForRent" },
    tenant: { type: Schema.Types.ObjectId, ref: "User" }
    
  });
  
  const Resever = mongoose.model("Resever", reseverSchema);
  export default Resever;
  