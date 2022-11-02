import express from 'express';
import cors from "cors"
import  DBconnect  from "./src/models/DBconnect.js";
import productRouter from "./src/routers/product.router.js";
// import Routes from './src/routers/auth.router.js';
import bodyParser  from "body-parser";
import authRouter from './src/routers/auth.router.js';

const app = express();


const PORT = process.env.PORT || 8000;

const db = new DBconnect()
app.use(cors())
app.use(bodyParser.json());
app.use('/api/products', productRouter)
app.use('',authRouter)

db.connect().then( () => {
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});