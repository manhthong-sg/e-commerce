const Messages = require('../models/Message');
const Rooms = require('../models/Room');


class RoomsController {

    //[GET] /rooms
    index(req, res) {
        Rooms.find({})
            .then(cart => res.json(cart))
            .catch((err) => console.log("Log room FAIL!" + err));
    }
    // [GET] /rooms/:roomId 
    async findRoomById(req, res) {
        const room = await Rooms.findOne({ user1: req.params.userId })
        if (room) {
            return res.json(room);
        } else {
            try {
                const newRoom = await Rooms({
                    user1: req.params.userId
                })
                newRoom.save()
                    .then(() => {
                        res.json(saveRoom)
                    })
            }
            catch (err) {
                res.json({ message: err });
            }
        }
    }

    // [GET] /rooms/:roomId 
    async findRoomByIdStaff(req, res) {
        const room = await Rooms.find({ user2: req.params.staffId }).populate("user1")
        if (room) {
            return res.json({ hasValue: true, room: room });
        }
        else {
            return res.json({ hasValue: false })
        }
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

    //[GET] /rooms/messages/:roomId --->get message by roomId
    getMessagesByRoomID(req, res) {
        Messages.find({ roomId: req.params.roomId })
            .then((messages) => {
                res.json(messages)
            })
            .catch(err => console.log(err))
    }
    async getUnMatchRoom(req, res){
        const room = await Rooms.find({ user2: "unmatch" }).populate("user1")
        if (room) {
            return res.json({ hasValue: true, room: room });
        }
        else {
            return res.json({ hasValue: false })
        }
    }
    matchStaff2Room(req, res){
        // console.log("hello",req.body.uer1);
        Rooms.findOne({user1: req.body.user1})
        .then(data=>{
            data.user2= req.body.user2
            data.save()
            .then(()=> console.log("Success match room"))
        })
    }

}
module.exports = new RoomsController;