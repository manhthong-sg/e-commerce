const Messages = require('../models/Message');

class MessagesController {

    //[GET] /messages
    index(req, res) {
        Messages.find({})
            .then(cart => res.json(cart))
            .catch((err) => console.log("Log messages FAIL!" + err));
    }

    //[POST] /messages --> storage message
    async storageMessages(req, res) {
        const message = new Messages({
            userId: req.body.userId,
            roomId: req.body.roomId,
            message: req.body.message,
            time: req.body.time
        });
        try {
            const saveMessage = await message.save();
            res.json(saveMessage);
        }
        catch (err) {
            res.json({ message: err });
        }
    }
}
module.exports = new MessagesController;