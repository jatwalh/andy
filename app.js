const express = require('express');
const app = express();
const cors = require('cors');
const bodyParse = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
require("./config/db");
app.use(express.json());
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(cookieParser());

const userRouter = require("./router/user.router");
app.use("/user", userRouter);

const prodRouter = require("./router/product/product.router");
app.use("/product", prodRouter);
// app.use("/product", ()=>{
//     console.log("srdfgyuio")
// });


module.exports = app;