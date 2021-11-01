const express = require('express');
const router=express.Router();
const cartsController=require('../app/controllers/CartsController');

//post /carts/
router.post('/', cartsController.addToCart)



// get /carts/:id
router.get('/:idUser', cartsController.getCartById)

// get /carts/
router.get('/', cartsController.index)

module.exports=router;