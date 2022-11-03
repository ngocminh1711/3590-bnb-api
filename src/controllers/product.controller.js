import HouseForRent from "../models/product.schema/housesForRent.schema.js";
import TypeRoom from "../models/product.schema/typeRooms.schema.js";


class ProductController {

    async createHouseForRent(req, res) {
        try {

            const data = {
                name: req.body.name,
                address: req.body.address,
                numberOfBedrooms: req.body.numberOfBedrooms,
                numberOfBathrooms: req.body.numberOfBathrooms,
                roomRates: req.body.roomRates,
                description: req.body.description,
                image_backdrop: req.body.image_backdrop,
                image_view: req.body.image_view,
                TypeRoom: req.body.typeRoom,
                numberOfTenants: req.body.numberOfTenants
            }

            let houseForRent = new HouseForRent({
                name: data.name,
                address: data.address,
                numberOfBedrooms: data.numberOfBedrooms,
                numberOfBathrooms: data.numberOfBathrooms,
                roomRates: data.roomRates,
                description: data.description,
                image_backdrop: data.image_backdrop,
                image_view: data.image_view,
                typeRoom: data.TypeRoom,
                numberOfTenants: data.numberOfTenants,
            });
            await houseForRent.save()


            return res.status(200).json({
                status: 'success',
                message: 'House For Rent create successfully'
            })
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Create error'
            })
        }
    }

    async deleteHouseForRent(req, res) {
        try {
            await HouseForRent.findByIdAndRemove(req.params.id);
            res.status(200).json("delete success!")
        } catch (err) {
            err.message

        }
    }

    async getHouseForRentById(req, res) {
        try {
            let id = req.params.id

            let houseForRent = await HouseForRent.findOne({_id: id}).populate("typeRoom")

            return res.status(200).json({
                status: 'success',
                message: 'Get house for rent successfully',
                data: houseForRent
            })
        } catch (err) {
            res.json({
                status: 'error',
                message: 'Get House for rent error'
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


    async getTypeRoom(req, res) {
        try {
            const type = await TypeRoom.find();
            return res.status(200).json({
                status: "success",
                message: "Get type room successfully",
                data: type,
            });
        } catch (err) {
            return res.json({
                status: "error",
                message: "Get TypeRoom error",
            });
        }
    }

    async searchHouseForRent(req, res) {
        try {

            let keyword = req.params.keyword;
            let typeRooms = await TypeRoom.find({$or: [{name: {$regex: `${keyword}`, $options: 'i'}}]})
            let houseForRent = await HouseForRent.find({
                $or: [{address: {$regex: `${keyword}`, $options: 'i'}},
                    {name: {$regex: `${keyword}`, $options: 'i'}},
                    {typeRoom: typeRooms}
                ]
            }).populate('typeRoom')
            if (!houseForRent) {
                return res.status(404).send({
                    status: 'error',
                    message: 'House for rent not found'
                })
            } else {

                return res.status(200).send({
                    status: 'success',
                    message: 'Search house for rent successfully',
                    houseForRent: houseForRent
                })
            }
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'House for rent not found'
            })
        }

    }

    async getTopHouseForRent(req, res) {
        try {

            const topHouseForRent = await HouseForRent.find().sort({ numberOfTenants : -1}).limit(4)
          if (topHouseForRent) {

              return res.status(200).send({
                  status: 'success',
                  message: 'Get top house for rent successfully',
                  topHouseForRent: topHouseForRent
              })
          }
          else {
              return res.status(404).json({ status : 'top house not found', message: 'Get top error'})
          }

        }
        catch (err) {
            res.status(404).json({
                status: 'error',
                message: 'Not found top house for rent'
            })
        }

    }

}

export default ProductController;
