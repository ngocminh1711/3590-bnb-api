import express from "express";
import ReseverController from "../controllers/resever.controller.js/resever.controller";

const reserverRouter = express.Router();
const reseverController = new ReseverController();

reserverRouter.post("/", (req, res) => {
  reseverController
      .createResever(req, res)
      .catch((res) => res.status(500).json("Server error"));
});

reserverRouter.get("/:id", (req, res) => {
  reseverController
      .getBookingHouse(req, res)
      .catch((res) => res.status(500).json("Server error"));
});
reserverRouter.get("/history-booking/:id", (req, res) => {
  reseverController
      .getHistoryBooking(req, res)
      .catch((res) => res.status(500).json("Server error"));
})




export default reserverRouter;

