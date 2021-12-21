const express = require('express');
const router=express.Router();
const roomsController=require('../app/controllers/RoomsController');

//get /rooms
router.post('/', roomsController.getRoomInfo)

//get /rooms/:roomId
router.get('/messages/:roomId', roomsController.getMessagesByRoomID)

router.get('/:userId', roomsController.findRoomById)
// get /rooms/
router.get('/', roomsController.index)

module.exports=router;