import Resever from "../../models/reserver/reserverSchema";
import HouseForRent from "../../models/product.schema/housesForRent.schema.js";

class ReseverController {
  async createResever(req, res) {
    try {
      let data = req.body;
      console.log(data);
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
        let idTenant = req.query.idTenant
        let idHost = req.query.idHost
        let house =  await HouseForRent.find({userId: idHost})
        let booking = await Resever.find({tenant: idTenant, house: house}).populate('tenant').populate('house')

      return res.status(200).json({
        message: "get success",
        booking: booking
      })


        
    }catch(err){
        return res.status(404).json({
            message: err.message,
          });
    }
  }
}

export default ReseverController;
