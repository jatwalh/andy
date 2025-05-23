const User = require("../model/users/user.model");

const create = async (req, res) => {
    // return console.log("qwertyu");
    const {
        name, email, password, phone, city
    } = req.body;

    try {
        const user = new User({
            name, email, password, phone, city
        });
        await user.save();

        res.status(201).json({ message: "User create successfully", user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    create
}