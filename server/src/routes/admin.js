const express = require('express');
const router=express.Router();
const adminController=require('../app/controllers/AdminController');

router.get('/getall', adminController.getAll)
// router.post('/register', adminController.register)
router.post('/login', adminController.login)
router.post('/edit/:phone', adminController.update)

module.exports=router;