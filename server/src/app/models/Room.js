const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    user1: {
        type: String,
        require: true,
        ref: 'User'
    },
    user2: {
        type: String,
        // default: "null"
    }
});


module.exports = mongoose.model('Rooms', roomSchema);