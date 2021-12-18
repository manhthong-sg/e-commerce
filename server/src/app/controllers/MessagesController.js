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
        //convert format date to "3:12 PM, 23/11"
        let today = new Date();
        let ampm = today.getHours() >= 12 ? 'PM' : 'AM';
        if (today.getHours() > 12) {
            var hours = today.getHours() - 12;
        }
        let currentTime = hours + ":" + today.getMinutes() + " " + ampm + ", " + today.getDate() + '/' + (today.getMonth() + 1)
        const message = new Messages({
            userId: req.body.userId,
            roomId: req.body.roomId,
            message: req.body.message,
            time: currentTime
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