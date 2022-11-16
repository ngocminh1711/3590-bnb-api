import HouseForRent from "../../models/product.schema/housesForRent.schema";
import Resever from "../../models/reserver/reserverSchema";

class ReseverController {
    async createResever(req, res) {
        try {
            let data = req.body;
            let booking = new Resever(data);
            await booking.save();
            return res.status(200).json({
                message: "Create success",
            });
        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }

    async getBookingHouse(req, res) {
        try {
            let id = req.params.id;
            let houseId = await HouseForRent.find({userId: id}).select("userId");

            let listHouseIds = [];
            for (const h of houseId) {
                listHouseIds.push(h._id.toString());
            }
            let listBooking = await Resever.find({houseId: {$in: listHouseIds}});


            return res.status(200).json({
                message: "successfully",
                listBooking: listBooking,
            })

        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }

    async getHistoryBooking(req, res) {
        try {
            let id = req.params.id;
            let data = await Resever.find({tenantId: id});

            return res.status(200).json({
                message: "get history booking successfully",
                historyBooking: data,
            });
        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }

    async processingStatus(req, res) {
        try {
            let id = req.params.id;
            let data = req.body;
            let status = await Resever.findByIdAndUpdate(id, data);
            return res.status(200).json({
                message: "update success",
            });
        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }

    async deleteBooking(req, res) {
        try {
            let id = req.params.id;
            let deleteBooking = await Resever.findByIdAndDelete({_id: id})
            if (deleteBooking) {
                return res.status(200).json({
                    message: "update success",
                });
            } else {
                return res.status(404).json({
                    message: "Not found this booking",
                });
            }
        } catch (err) {
            return res.status(404).json({
                message: err.message,
            });
        }
    }
}

export default ReseverController;
