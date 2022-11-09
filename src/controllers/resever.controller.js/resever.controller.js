import Resever from "../../models/reserver/reserverSchema";

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
        let id = req.params.id
        
    }catch(err){
        return res.status(404).json({
            message: err.message,
          });
    }
  }
}

export default ReseverController;
