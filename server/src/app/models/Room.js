const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
    user1: String,
    user2: String
});


module.exports = mongoose.model('Rooms', roomSchema);