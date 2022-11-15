import express from "express";
import ReseverController from "../controllers/reseverController/resever.controller.js";

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

reserverRouter.patch("/change-status/:id", (req, res) => {
  reseverController
    .processingStatus(req, res)
    .catch((res) => res.status(500).json("Server error"));
});

reserverRouter.post("/history/admin", (req, res) => {
  reseverController
    .adminHistory(req, res)
    .catch((res) => res.status(500).json("Server error"));
});

reserverRouter.delete("/history-booking/delete/:id", (req,res) => {
  reseverController.deleteBooking(req,res).catch((res) => res.status(500).json("Server error"))
})

export default reserverRouter;