const Prod = require("../model/product/product.model");
const mongoose = require("mongoose")
const path = require("path");

const crateProd = async (req, res) => {

    const { name, userId, userFor, orderID, type, color, price } = req.body;
    try {
        const product = new Prod({
            name, userId, userFor, type, color, price, orderID
        })

        await product.save();
        return res.status(201).json({ message: "product create successfully", product });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
}

const getJoin = async (req, res) => {

    const { productId } = req.params
    try {
        const ProdData = await Prod.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(productId)
                }
            },
            {
                $lookup: {
                    from: 'userschemas',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            // {
            //     $project: {
            //         name: 1,
            //         price: 1,
            //         type: 1,
            //         color: 1,
            //         userFor: 1,
            //         createdAt: 1,
            //         'user.name': 1,
            //         'user.email': 1,
            //         'user.city': 1
            //     }
            // }
        ])
        res.status(200).json({
            message: "Products with user details",
            data: ProdData
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

}

const getTwoJoin = async (req, res) => {
    const { productId } = req.params

    console.log(productId)
    try {
        const ProdData = await Prod.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(productId)
                }
            },
            {
                $lookup: {
                    from: 'userschemas',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },

            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderID',
                    foreignField: '_id',
                    as: 'order'
                }
            },
            {
                $unwind: '$order'
            },



            // {
            //     $project: {
            //         name: 1,
            //         price: 1,
            //         type: 1,
            //         color: 1,
            //         userFor: 1,
            //         createdAt: 1,
            //         'user.name': 1,
            //         'user.email': 1,
            //         'user.city': 1
            //     }
            // }
        ])
        res.status(200).json({
            message: "Products with user details",
            data: ProdData
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }

}


const pop = async (req, res) => {
    const { pid } = req.params;
    try {

        // const pData = await Prod.find({ id: pid }).populate("userId");
        const pData = await Prod.find({ id: pid }).populate('userId', 'name email city -_id');


        res.status(200).json({
            message: "Products fetched with user info",
            data: pData
        });

    } catch (err) {
        res.status(500).json({ err: err.message })
    }

}


const uploads = async (req, res) => {
    const { name, userId, userFor, orderID, type, color, price } = req.body;
    try {
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const product = new Prod({
            name,
            userId,
            userFor,
            type,
            color,
            price,
            orderID,
            image: imagePath
        });

        await product.save();
        return res.status(201).json({ message: "Product created successfully", product });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
};

const uploadfive = async (req, res) => {
    const { name, userId, userFor, orderID, type, color, price } = req.body;

    try {
        const imagePaths = req.files.map(file => file.filename); // or use file.path if storing full path

        const product = new Prod({
            name,
            userId,
            userFor,
            type,
            color,
            price,
            orderID,
            images: imagePaths
        });

        await product.save();
        return res.status(201).json({ message: "Product created successfully", product });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create product" });
    }
}




module.exports = {
    crateProd, getJoin, pop, getTwoJoin, uploads, uploadfive
}





// const Prod = require("../model/product/product.model");
// const mongoose = require("mongoose");
// const path = require("path");

// const crateProd = async (req, res) => {
//     const { name, userId, userFor, orderID, type, color, price } = req.body;
//     try {
//         let imagePath = '';
//         if (req.file) {
//             imagePath = `/uploads/${req.file.filename}`;
//         }

//         const product = new Prod({
//             name,
//             userId,
//             userFor,
//             type,
//             color,
//             price,
//             orderID,
//             image: imagePath
//         });

//         await product.save();
//         return res.status(201).json({ message: "Product created successfully", product });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ err: err.message });
//     }
// };
