const express = require('express');
const router=express.Router();
const usersController=require('../app/controllers/UsersController');

// get /users/
router.get('/', usersController.index)

//post /users/
router.post('/', usersController.register)
module.exports=router;