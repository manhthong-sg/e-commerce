const Messages = require('../models/Message');
const Rooms = require('../models/Room');


class RoomsController {

    //[GET] /messages
    index(req, res) {
        Rooms.find({})
            .then(cart => res.json(cart))
            .catch((err) => console.log("Log room FAIL!" + err));
    }
    //[POST] /rooms --> get roomId from userid
    async getRoomInfo(req, res) {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        const room = new Room({
            user1: req.body.user1,
            user2: req.body.user2
        });
        const query = [{ user1: user1 }, { user2: user2 }];
        const query1 = [{ user1: user2 }, { user2: user1 }]
        const roomTemp = await Room.findOne({ $or: [{ $and: query }, { $and: query1 }] })
        if (roomTemp) {
            return res.json(roomTemp);
        } else {
            try {
                const saveRoom = await room.save();
                res.json(saveRoom);
            }
            catch (err) {
                res.json({ message: err });
            }
        }
    }

    //[GET] /rooms/:roomId --->get message by roomId
    getMessagesByRoomID(req, res)=>{
    Messages.find({ roomId: req.params.roomId })
        .then((messages) => {
            req.json(messages)
        })
        .catch(err => console.log(err))
}
    
}
module.exports = new RoomsController;