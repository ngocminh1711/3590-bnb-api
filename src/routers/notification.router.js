

import express from "express";
import NotificationController from "../controllers/notificationController/notification.controller.js";

const notificationRouter = express.Router();

const notificationController = new NotificationController();


notificationRouter.post('/create', function (req, res) {
    notificationController.createNotification(req, res).catch(err => { res.status(500).json({error: err.message})});
})

notificationRouter.get('/:id', function (req, res) {
    notificationController.getNotification(req, res).catch(err => {
        res.status(500).json({error: err.message})
    })
})

notificationRouter.delete('/:id', function (req, res) {
    notificationController.deleteNotification(req, res).catch(err => res.status(500).json({error: err.message}) )
})


export default notificationRouter;