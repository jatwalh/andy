const Prod = require("../model/product/product.model");

const crateProd = async (req, res) => {
    // return console.log("tryui")
    const { name, userId, userFor, type, color, price } = req.body;
    try {
        const product = new Prod({
            name, userId, userFor, type, color, price
        })

        await product.save();
        return res.status(201).json({ message: "product create successfully", product });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message });
    }
}


const getJoin = async (req, res) => {
    try {
        const ProdData = await Prod.aggregate([
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

module.exports = {
    crateProd, getJoin
}

