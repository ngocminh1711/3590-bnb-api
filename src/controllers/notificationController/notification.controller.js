import Notification from "../../models/notificationSchema/notification.schema.js"
import Resever from "../../models/reserver/reserverSchema.js";


class NotificationController {

    async createNotification(req, res) {
        try {
            let id = req.params.id;
            let booking = await Resever.findOne({_id: id})
            let tenantId = booking.tenantId;
            let houseId = booking.houseId;
            let newNotification = new Notification({booking: id, tenantId: tenantId, house: houseId});
            await newNotification.save();
        } catch (err) {
            return res.status(404).json({message: err.message});
        }
    }

    async getNotification(req, res) {
        try {
            let id = req.params.id;
            let data = await Notification.find({tenantId: id}).populate('booking').populate('house')
            res.status(200).json({message: "successfully", notification: data})
        } catch (err) {
            return res.status(404).json({message: err.message});
        }
    }

    async deleteNotification (req, res) {
        try {
            let id = req.params.id;
            await Notification.findByIdAndRemove(id)
            return res.status(200).json({message: "Delete notification successfully"})
        }
        catch (err) {
            return res.status(404).json({ message: err.message})
        }
    }


}

export default NotificationController