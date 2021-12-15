const express = require('express');
const router=express.Router();
const adminController=require('../app/controllers/AdminController');
const verifyToken = require('./../middleware/auth')

router.get('/getall', adminController.getAll)
//register for lower staff account
router.post('/register', adminController.register)
router.post('/login', adminController.login)
router.post('/edit/:phone', adminController.update)
router.get('/finduser/:phone', verifyToken, adminController.findUser)

module.exports=router;