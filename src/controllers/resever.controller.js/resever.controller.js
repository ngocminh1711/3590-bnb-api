import HouseForRent from "../../models/product.schema/housesForRent.schema";
import Resever from "../../models/reserver/reserverSchema";

class ReseverController {
    async createResever(req, res) {
        try {
            let data = req.body;
            let booking = new Resever(data)
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

    async getBookingHouse(req,res) {
        try{
            let id = req.params.id;
            let houseId = await HouseForRent.find({userId: id}).select("userId")

            let listHouseIds = [];
            for (const h of houseId) {
                listHouseIds.push( h._id.toString())
            }

            let listBooking = await Resever.find({houseId: {'$in': listHouseIds}});



            return res.status(200).json({
                message: "succes",
                listBooking: listBooking,
            })

        }catch(err){
            return res.status(404).json({
                message: err.message,
            });
        }
    }
}
//add

export default ReseverController;