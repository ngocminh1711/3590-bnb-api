import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import  DBconnect  from "./src/models/DBconnect.js";
import authRouter from './src/routers/auth.router.js';
import productRouter from "./src/routers/product.router.js";




const app = express();


const PORT = process.env.PORT || 8000;

const db = new DBconnect()


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('', authRouter);


app.use('/api/products', productRouter)




db.connect().then( () => {
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})



app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});