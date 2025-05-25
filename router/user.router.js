const express = require("express");

const userRouter = express.Router();



const {
    create , findbyid, findAll, upadateByid, upadateMany
} = require("../controller/user.controller")

userRouter.post("/create", create) // http://localhost:3000/user/create
userRouter.get("/findbyid/:id", findbyid) // http://localhost:3000/user/create
userRouter.get("/findall", findAll) // http://localhost:3000/user/findall
userRouter.post("/fidupdate/:id", upadateByid) // http://localhost:3000/user/findall
userRouter.post("/updatemany/:id", upadateMany) // http://localhost:3000/user/findall

module.exports = userRouter;