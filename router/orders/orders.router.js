const express = require("express");

const ordersRouter = express.Router();


const {
    create
} = require("../../controller/orders.controller")

ordersRouter.post("/create", create);


module.exports = ordersRouter;