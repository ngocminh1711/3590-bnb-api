
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    booking: {type: Schema.Types.ObjectId, ref: 'Resever'},
    tenantId: String,
    hostId: String,
    house: {type: Schema.Types.ObjectId, ref: 'HouseForRent'},
    notificationStatus: {
        type: String,
        default: "not seen yet"
    },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;