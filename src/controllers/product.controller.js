import HouseForRent from "../models/product.schema/housesForRent.schema.js";


class ProductController {



    async createHouseForRent(req, res) {
        try {
            const data = {
                name: req.name,
                address: req.address,
                typeRoom: req.typeRoom,
                numberOfBedrooms: req.numberOfBedrooms,
                numberOfBathrooms: req.numberOfBathrooms,
                roomRates: req.roomRates,
                description: req.description,
                image_backdrop: req.image_backdrop,
                image_view: req.image_view,
            }


            let houseForRent = new HouseForRent(data);
            await houseForRent.save()
        }
        catch (err) {
            return res.json({
                status: 'error',
                message: 'Create '
            })
        }
    }
}
export default ProductController;