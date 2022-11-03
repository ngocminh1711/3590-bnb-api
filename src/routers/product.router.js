import express from 'express';
import ProductController from "../controllers/product.controller.js";
import multer from 'multer' ;

const upload = multer()


const productRouter = express.Router();
const productController = new ProductController;



productRouter.post('/', upload.none(),
    async (req, res, next) => {
        productController.createHouseForRent(req, res, next).catch(res => res.status(500).json('Server error'));
    })
productRouter.get('/type-room',
    async (req, res, next) => {

        productController.getTypeRoom(req, res, next).catch(res => res.status(500).json('Server error'));
    })



productRouter.get('/:id', async (req, res, next) => {
    productController.getHouseForRentById(req, res, next).catch(res => res.status(500).json('Server error'));
})

productRouter.get('/', async function (req, res) {
    productController.getHouseForRent(req, res).catch(res => res.status(500).json('Server error'))

})

productRouter.get('/search/:keyword', async (req, res) => {
    productController.searchHouseForRent(req, res).catch(() => res.status(500).json('Server error'))
})

productRouter.get('/top-house', async (req, res,next) => {
    console.log(1)
})
productRouter.delete('/:id',productController.deleteHouseForRent)

export default productRouter 
