const express = require("express");

const prodRouter = express.Router();

const { crateProd, getJoin } = require("../../controller/product.controller")

prodRouter.post("/create", crateProd);
// prodRouter.post("/create", ()=>{
//     console.log("rerererer")
// });

prodRouter.post("/getJoin", getJoin);




module.exports = prodRouter;