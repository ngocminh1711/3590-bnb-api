import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import  DBconnect  from "./src/models/DBconnect.js";
import authRouter from './src/routers/auth.router.js';


const PORT = process.env.PORT || 8000;

const db = new DBconnect()

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('', authRouter);





db.connect().then( () => {
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})




app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});