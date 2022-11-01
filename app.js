import express from 'express';
import cors from "cors"
import  DBconnect  from "./src/models/DBconnect.js";
import Routes from './src/routers/Auth/auth.js';
import bp from "body-parser";


const app = express();

const PORT = process.env.PORT || 8000;

const db = new DBconnect()

db.connect().then( () => {
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/api/auth',Routes)

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});