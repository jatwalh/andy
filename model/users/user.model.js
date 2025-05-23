const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: { type: Date, default: Date.now }
});

const users = mongoose.model("userSchema", userSchema);

module.exports = users;