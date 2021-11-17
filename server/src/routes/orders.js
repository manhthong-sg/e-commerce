const express = require('express');
const router=express.Router();
const ordersController=require('../app/controllers/OrdersController');

//post /carts/
// router.post('/', cartsController.addToCart)



// get /carts/:id
// router.get('/:idUser', cartsController.getCartById)

// get /carts/
router.get('/', ordersController.index)

module.exports=router;