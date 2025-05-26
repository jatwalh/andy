const Orders = require("../model/orders/ooders.model");

const create = async (req, res) => {

    const { title } = req.body;
    try {
        const data = new Orders({
            title: title
        })
        await data.save();
        return res.status(201).json({ message: "product create successfully", data });

    } catch (error) {
        res.status(500).json({ err: error.message })
    }

}

module.exports = {
    create
}