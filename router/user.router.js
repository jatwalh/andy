const express = require("express");

const userRouter = express.Router();



const {
    create 
} = require("../controller/user.controller")

userRouter.post("/create", create) // http://localhost:3000/user/create

module.exports = userRouter;