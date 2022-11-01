import express from 'express';
import cors from "cors"
import  DBconnect  from "./src/models/DBconnect.js";
import Routes from './src/routers/Auth/auth.js';
import bodyParser  from "body-parser";

const app = express();

const PORT = process.env.PORT || 8000;

const db = new DBconnect()
app.use(cors())
db.connect().then( () => {
    console.log('DB connected')
}).catch(err => {
    console.log(err.message)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/auth',Routes)

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});