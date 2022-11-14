import Notification from "../../models/notificationSchema/notification.schema.js"
import Resever from "../../models/reserver/reserverSchema.js";


class NotificationController {

    async createNotification(req, res) {
        try {
            let bookingId = req.query.bookingId;
            let idHost = req.query.hostId;
            console.log({bookingId: bookingId, id: idHost});
            let booking = await Resever.findOne({_id: bookingId})
            let tenantId = booking.tenantId;
            let houseId = booking.houseId;
            let newNotification = new Notification({booking: bookingId, tenantId: tenantId, house: houseId, hostId: idHost});
            await newNotification.save();
            return res.status(200).json({ message: "Create notification successfully"})
        } catch (err) {
            return res.status(404).json({message: err.message});
        }
    }

    async getNotification(req, res) {
        try {
            let id = req.params.id;
            let data = await Notification.find({hostId : id}).populate('booking').populate('house')
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