const express = require('express');
const router=express.Router();
const ordersController=require('../app/controllers/OrdersController');

// post /orders/
router.post('/', ordersController.createOrder)

// get /orders/:idUser/:statusOrder
router.get('/:idUser/:statusOrder', ordersController.getOrdersByIdAndStatus)

// get /orders/
router.get('/', ordersController.index)

module.exports=router;