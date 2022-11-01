

import express from 'express';
import ProductController from "../controllers/product.controller.js";



const productRouter = express.Router();
const productController = new ProductController;


productRouter.post('/products', (req, res, next)=> {
    productController.createHouseForRent(req, res, next).catch(res => res.status(500).json('Server error'));
})


export default productRouter;