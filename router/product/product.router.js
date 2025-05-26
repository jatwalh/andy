const express = require("express");
const multer = require("multer");
const path = require("path");
const prodRouter = express.Router();
const uploadss = require("../../middleware/upload");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

const { crateProd, getJoin, getTwoJoin,
    pop, uploads, uploadfive } = require("../../controller/product.controller")

prodRouter.post("/create", crateProd);
prodRouter.post("/upload", upload.single('image'), uploads);
prodRouter.post("/uploadfive", uploadss.array("images", 5), uploadfive);
prodRouter.post("/getJoin/:productId", getJoin);
prodRouter.post("/gettwoJoin/:productId", getTwoJoin);
prodRouter.post("/pop/:pid", pop);





module.exports = prodRouter;