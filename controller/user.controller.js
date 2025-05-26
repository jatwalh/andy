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

        return res.status(201).json({ message: "User create successfully", user });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: error.message });
    }
}

const findbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await User.findById({ _id: id })
        if (!userData) {
            return res.status(404).json({ msg: "User not exist" })
        }
        return res.status(200).json(userData);
        // return res.send(200).json({ msg: "User not exist", usre: userData })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const findAll = async (req, res) => {

    try {
        // const userData = await User.find({}); // it is returing all of the documents
        // const userData = await User.find({ city: "chd" }, { name: 1, _id: 0, city: 1 }).skip(5); // with filter and proection
        // const userData = await User.find({ city: "chd" }, { name: 1, _id: 0, city: 1 }).limit(4); // with filter and proection
        // const userData = await User.find({ city: "chd" }, { name: 1, _id: 0, city: 1 }).limit(0).sort({ name: -1 }); // with filter and proection
        // const userData = await User.find({ city: "chd" }, { name: 1, _id: 0, city: 1 }).limit(0).sort({ name: -1 }); // with filter and proection
        // const userData = await User.find({ city: "chd" }).select('-_id'); // with for include and exclude
        // const userData = await User.find({ city: "chd" }).lean(); // return js JS objects instead of Mongoose docs
        // const userData = await User.find({ phone: {$gte : 1212121212, $lte : 5555555555 }  }); // return js JS objects instead of Mongoose docs
        // const userData = await User.find({ phone: { $eq: 1212121212 } }); 
        // const userData = await User.find({ phone: { $ne: 1212121212 } }); 
        // const userData = await User.find({ phone: { $in: [1212121212, 212123234] } }); 
        // const userData = await User.find({ phone: { $nin: [1212121212, 212123234] } }); 
        // const userData = await User.find( { $or: [{ phone: 1212121212 }, { phone: 212123234 }] }); 
        // const userData = await User.find( { $and: [{ phone:{ $gte : 1212121212 }}, { phone:{ $lte :5555555555 }}] }); 
        // const userData = await User.find( { $and: [{ phone:{ $gte : 1212121212 }}, { phone:{ $lte :5555555555 }}] });  
        // const userData = await User.find({ phone: { $not: { $gte: 5555555555 } } }); 
        const userData = await User.find({ phone: { $exists: true } });

        if (!userData.length === 0) {
            return res.status(404).json({ msg: "User not exist" })
        }
        return res.status(201).json(userData);
        // return res.send(200).json({ msg: "User not exist", usre: userData })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const upadateByid = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {

        const userData = await User.findByIdAndUpdate({ _id: id },
            {
                name: name,
                email: email
            }, { new: true }
        )
        if (!userData) {
            return res.status(404).json({ msg: "User not exist" })
        }
        return res.status(201).json(userData);
        // return res.send(200).json({ msg: "User not exist", usre: userData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

const upadateMany = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {

        const userData = await User.findByIdAndUpdate({ _id: id },
            {
                name: name,
                email: email
            }, { new: true }
        )
        if (!userData) {
            return res.status(404).json({ msg: "User not exist" })
        }
        return res.status(201).json(userData);
        // return res.send(200).json({ msg: "User not exist", usre: userData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    create, findbyid, findAll, upadateByid, upadateMany
}
