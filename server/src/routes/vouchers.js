const express = require('express');
const router=express.Router();
const vouchersController=require('../app/controllers/VouchersController');

// post /orders/
router.post('/', vouchersController.addVoucher)

// // post /orders/cancel/:idOrder
// router.post('/cancel/:idOrder', ordersController.cancelOrderById)

// // get /orders/:idUser/:statusOrder
// router.get('/:idUser/:statusOrder', ordersController.getOrdersByIdAndStatus)


// get /orders/
router.get('/', vouchersController.index)
router.post("/remove/:idVoucher", vouchersController.removeVoucher)
router.post("/update/:idVoucher", vouchersController.updateVoucher)


module.exports=router;