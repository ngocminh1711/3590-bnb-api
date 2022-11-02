import HouseForRent from "../models/product.schema/housesForRent.schema.js";
import TypeRoom from "../models/product.schema/typeRooms.schema.js";
import HousesForRentSchema from "../models/product.schema/housesForRent.schema.js";


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
            let houseForRents = await HouseForRent.find().populate('typeRoom')
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return res.status(200).send({
                status: 'success',
                message: 'Get house for rent successfully',
                houseForRents: houseForRents
            })

        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Error getting House for rent'
            })
        }
    }
    async searchHouseForRent(req, res) {
        try {
            let keyword = req.params.keyword;
            let houseForRent = await HouseForRent.find( {$or: [{address: {$regex: `${keyword}`, $options: 'i'}}

                ]})
            if (!houseForRent) {
                return res.status(404).send({
                    status: 'error',
                    message: 'House for rent not found'
                })
            }
            else {

                return res.status(200).send({
                    status: 'success',
                    message: 'Search house for rent successfully',
                    houseForRent: houseForRent
                })
            }
        }
        catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'House for rent not found'
            })
        }


    }
}
export default ProductController;