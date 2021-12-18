const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    user1: String,
    user2: {
        type: String,
        default: "null"
    }
});


module.exports = mongoose.model('Rooms', roomSchema);