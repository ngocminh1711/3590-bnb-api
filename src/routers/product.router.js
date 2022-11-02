

import express from 'express';
import ProductController from "../controllers/product.controller.js";
import multer from 'multer' ;

const upload = multer()



const productRouter = express.Router();
const productController = new ProductController;


productRouter.post('/',upload.none(), async (req, res, next)=> {
    productController.createHouseForRent(req, res, next).catch(res => res.status(500).json('Server error'));
})
productRouter.get('/type-room', async (req, res, next) => {
    productController.getTypeRoom(req, res, next).catch(res => res.status(500).json('Server error'));
})
productRouter.get('/:id', async (req, res, next) => {
    productController.getHouseForRent(req, res, next).catch(res => res.status(500).json('Server error'));
})

export default productRouter;