import express from 'express';
import cors from "cors"
import  DBconnect  from "./src/models/DBconnect.js";
import productRouter from "./src/routers/product.router.js";


import bodyParser from "express";

const app = express();
app.use(cors());

app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

const db = new DBconnect()

app.use(bodyParser.json());

app.use('/api/products', productRouter)

db.connect().then( () => {
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});