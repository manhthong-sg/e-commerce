const express = require('express');
const router=express.Router();
const roomsController=require('../app/controllers/RoomsController');

//get /rooms
router.post('/', roomsController.getRoomInfo)

//get /rooms/messages/:roomId
router.get('/messages/:roomId', roomsController.getMessagesByRoomID)

//get /rooms/:staffId
router.get('/staff/:staffId', roomsController.findRoomByIdStaff)

router.get('/user/:userId', roomsController.findRoomById)

//get all rooms that is un match with someone
router.get('/unmatch', roomsController.getUnMatchRoom)

//match staff to user room
router.post('/match', roomsController.matchStaff2Room)
// get /rooms/
router.get('/', roomsController.index)

module.exports=router;