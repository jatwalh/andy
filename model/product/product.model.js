const mongoose = require('mongoose');

const ProdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    type: {
        type: String,
        enum: ['typeone', 'typetwo', 'typethree'],
        required: [true, "Product type is required"],
    },
    color: {
        type: String,
        enum: ['red', 'green', 'blue'],
        required: false,
    },
    userFor: {
        type: String,
        required: [true, "User purpose is required"],
        trim: true,
        enum: ["Men", "Women", "Kids", "Unisex"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    },
    // image: {
    //     type: String, // Store image filename or URL
    //     // required: [true, "Product image is required"]
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Prod = mongoose.model("Prod", ProdSchema);
module.exports = Prod;
