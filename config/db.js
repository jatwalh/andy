const mongoose = require('mongoose');

const dbURL = "mongodb+srv://jatwalh:U1GG69XbLdQVSYFO@cluster0.pcktxrd.mongodb.net/test"

mongoose.connect(dbURL)
.then(()=>{
    console.log('Connected to MongoDB Atlas');
}).catch((err)=>{
    console.log('Connection to DB failed', err);
});

module.exports = dbURL;