const express = require('express');
const router=express.Router();
const messagesController=require('../app/controllers/MessagesController');


// get /messages/
router.get('/', messagesController.index)

module.exports=router;