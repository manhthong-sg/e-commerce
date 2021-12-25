const express = require("express");
const router = express.Router();
const adminController = require("../app/controllers/AdminController");
const authenToken = require('../middlewares/auth')

router.get("/", adminController.getAll);
// router.post("/register", adminController.register);
router.post("/login", adminController.login);
// router.get("/test", authenToken, adminController.test);
router.post("/edit/:phone", adminController.update);

router.get('/:idStaff', adminController.getStaffById)

module.exports = router;
