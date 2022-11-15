import express from 'express';
import ProductController from "../controllers/product.controller.js";
import multer from 'multer' ;
import {editProfileUser} from "../controllers/userController/user.controller.js";
import routerUser from "./user.router.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";

const upload = multer()
const productRouter = express.Router();
const productController = new ProductController;
productRouter.post("/", upload.none(), async (req, res, next) => {
  productController
    .createHouseForRent(req, res, next)
    .catch((res) => res.status(500).json("Server error"));
});
productRouter.get("/type-room", async (req, res, next) => {
  productController
    .getTypeRoom(req, res, next)
    .catch((res) => res.status(500).json("Server error"));
});

productRouter.get("/house-status", async (req, res, next) => {
  productController
    .getHouseStatus(req, res, next)
    .catch((res) => res.status(500).json("Server error"));
});

productRouter.get("/get-house-for-rent-by-id/:id", async (req, res, next) => {
  productController
    .getHouseForRentById(req, res, next)
    .catch((res) => res.status(500).json("Server error"));
});
productRouter.get("/", async function (req, res) {
  productController.getHouseForRent(req, res).catch((res) => res.status(500).json("Server error"));
});
productRouter.get("/search/:keyword", async (req, res) => {
  productController
    .searchHouseForRent(req, res)
    .catch(() => res.status(500).json("Server error"));
});
productRouter.get('/top-house', async (req, res,next) => {
    productController.getTopHouseForRent(req,res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.delete('/:id',async (req, res, next )=> {
    productController.deleteHouseForRent(req,res,next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/vip-house', async (req, res, next)=> {
    productController.getVipHouse(req, res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/normal-house', async (req, res, next)=> {
    productController.getNormalHouse(req, res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/one-bed-room', async (req, res, next)=> {
    productController.getOneBedRoom(req, res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/multi-bed-room', async (req, res, next)=> {
    productController.getMultipleBedRoom(req, res, next).catch(()=> res.status(500).json('Server error'))
})
productRouter.get('/one-bath-room', async (req, res, next)=> {
    productController.getOneBathRoom(req, res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/multi-bath-room', async (req, res, next)=> {
    productController.getMultipleBathRoom(req, res, next).catch(()=> res.status(500).json('Server error'))
})
productRouter.get('/less500', async (req,res,next) =>{
    productController.getRoomRatesLess500(req, res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/than500', async (req,res,next) =>{
    productController.getRoomRatesThan500(req, res, next).catch(() => res.status(500).json('Server error'))
})
productRouter.get('/than1000', async (req,res,next) =>{
    productController.getRoomRatesThan1000(req, res, next).catch(() => res.status(500).json('Server error'))
})

productRouter.get('/:id', async(req,res)=>{
  productController.userHouse(req,res).catch(()=>res.status(500).json('Server error'))
})
productRouter.patch('/edit/:id', async (req,res) => {
    console.log(1)
    productController.updateHouse(req, res).catch(() => res.status(500).json("Server error"));
})
productRouter.get('/getHost/:id', async (req,res) =>{
    productController.getHost(req, res).catch(() => res.status(500).json('Server error'));
})

export default productRouter;

