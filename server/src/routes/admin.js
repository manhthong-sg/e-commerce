const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/AdminController");
const OrdersController = require("../app/controllers/OrdersController");
const authenToken = require('../middlewares/auth')

router.get("/", adminController.getAll);
// router.post("/register", adminController.register);
router.post("/login", adminController.login);
// router.get("/test", authenToken, adminController.test);
router.post("/edit/:phone", adminController.update);

router.post("/remove/:idStaff", adminController.removeStaff)
router.post("/update/:idStaff", adminController.updateAdmin)

router.get('/:idStaff', adminController.getStaffById)

router.get('/orders/:statusID', adminController.getOrdersByStatus)

router.post("/orders/:idOrder/:status", OrdersController.updateStatus);

router.post("/refund/:idOrder", OrdersController.refund);
module.exports = router;