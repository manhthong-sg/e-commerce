const express = require('express');
const router=express.Router();
const roomsController=require('../app/controllers/RoomsController');

//get /rooms/:roomId
router.post('/', roomsController.getRoomInfo)

//get /rooms/:roomId
router.get('/:roomId', roomsController.getMessagesByRoomID)

// get /rooms/
router.get('/', roomsController.index)

module.exports=router;