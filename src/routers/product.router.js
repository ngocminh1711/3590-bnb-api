import express from "express";
import ProductController from "../controllers/product.controller.js";
import multer from "multer";

const upload = multer();

const productRouter = express.Router();

const productController = new ProductController;

productRouter.post('/', upload.none(),
    async (req, res, next) => {
        productController.createHouseForRent(req, res, next).catch(res => res.status(500).json('Server error'));
    })

productRouter.get('/type-room',
    async (req, res, next) => {
const productController = new ProductController();})

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

// productRouter.get("/:userid", async function (req, res) {
//   productController.getUserHouseForRent(req, res).catch((res) => res.status(500).json("Server error"));
// });

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

productRouter.get('/:id', async(req,res)=>{
  productController.userHouse(req,res).catch(()=>res.status(500).json('Server error'))
})


export default productRouter;

