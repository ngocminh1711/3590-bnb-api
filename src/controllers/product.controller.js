import HouseForRent from "../models/product.schema/housesForRent.schema.js";
import TypeRoom from "../models/product.schema/typeRooms.schema.js";


class ProductController {


    async createHouseForRent(req, res) {
        console.log(req.body);
        try {
            const data = {
                name: req.body.name,
                address: req.body.address,
                typeRoom: req.body.typeRoom,
                numberOfBedrooms: req.body.numberOfBedrooms,
                numberOfBathrooms: req.body.numberOfBathrooms,
                roomRates: req.body.roomRates,
                description: req.body.description,
                image_backdrop: req.body.image_backdrop,
                image_view: req.body.image_view,
            }


            let houseForRent = new HouseForRent(data);
            await houseForRent.save()

            return res.status(200).json({
                status: 'success',
                message: 'House For Rent create successfully'
            })
        }
        catch (err) {
            return res.json({
                status: 'error',
                message: 'Create error'
            })
        }
    }


    async getTypeRoom (req, res) {
        try {
            const type = await TypeRoom.find()
            return res.status(200).json({
                status: 'success',
                message: 'Get type room successfully',
                data : type
            })
        }
        catch (err) {
            return res.json({
                status: 'error',
                message: 'Get TypeRoom error'
            })
        }

    }

    async getHouseForRent(req, res) {
        try {
            let id = req.params.id
            let houseForRent = HouseForRent.findOne({_id: id})

            return res.status(200).json({
                status: 'success',
                message: 'Get house for rent successfully',
                data : houseForRent
            })
        }
        catch (err) {
            res.json({
                status: 'error',
                message: 'Get House for rent error'
            })
        }

    }
}
export default ProductController;