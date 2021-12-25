const mongoose = require('mongoose');
//const Room = require('./room.model');

const messageSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    roomId: {
        type: String,
        validate: {
            validator: roomId => roomId !== "",
            message: "RoomId is not empty",
            required: true
        },
    },
    message: String,
    time: String
});

module.exports = mongoose.model('Messages', messageSchema);