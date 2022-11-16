import express from "express";
import cors from "cors";
import DBconnect from "./src/models/DBconnect.js";
import productRouter from "./src/routers/product.router.js";
import bodyParser from "body-parser";
import authRouter from "./src/routers/auth.router.js";
import userRouter from "./src/routers/user.router.js";
import reserverRouter from "./src/routers/reserver.router.js";
import notificationRouter from "./src/routers/notification.router.js";

const app = express();

const PORT = process.env.PORT || 8000;

const db = new DBconnect();
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resever", reserverRouter);
app.use("/api/notification", notificationRouter);

db.connect()
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});