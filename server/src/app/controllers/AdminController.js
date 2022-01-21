const Admin = require('../models/Admin')
const Order = require('../models/Order')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class AdminController {
    async getStaffById(req, res){
        const staff= await Admin.findOne({ _id: req.params.idStaff })
        if(staff){
            return res.json({hasValue: true, user: staff})
        }
        else{
            return res.json({hasValue: false})
        }
    }
    async getAll(req, res) {
        try {
            const users = await Admin.find({})
            res.json({ success: true, message: "nice >.<", users })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }

    // //CRUD
    // //Create
    // [post] /bomaylaadmin/register
    // async register(req, res, next) {
    //     const { phone, password } = req.body
    //     if (!phone || !password)
    //         return res.json({ success: false, message: 'missing phonenumber or password' })
    //     try {
    //         const user = await Admin.findOne({ phone })
    //         if (user) {
    //             return res.json({ success: false, message: 'This Phone number have already!' })
    //         }

    //         //hash password
    //         const hasedPassword = await bcrypt.hash(req.body.password, 10)
    //         req.body.password = hasedPassword
    //         req.body.role=req.body.role || 'ADMIN'
    //         const newUser=Admin(req.body);
    //         await newUser.save()
    //         console.log('flag')

    //         //return token
    //         //sign token >.<
    //         const accessToken = await jwt.sign({
    //             phone:newUser.phone,
    //             role:newUser.role,
    //         }, process.env.ACCESS_TOKEN_SECRET)

    //         return res.json({ success: true, message:'register successfully', accessToken})
    //     } catch (error) {
    //         res.json({ success: false, message: error.message })
    //     }
    // }

    //R
    //login
    // [post] /bomaylaadmin/login
    async login(req, res) {
        const { phone, password } = req.body
        console.log("hello: ",phone, password);
        //check request have phone and password
        if (!phone || !password)
            return res.json({ success: false, message: 'missing phonenumber or password' })
        try {
            //check account is valid
            const user = await Admin.findOne({ phone })
            if (!user || !bcrypt.compareSync(password, user.password))
                return res.json({ success: false, message: 'incorrect phone number or password' })

            //when login success return token {phone, role, token}
            const accessToken = await jwt.sign({
                phone: user.phone,
                role: user.role,
            }, process.env.ACCESS_TOKEN_SECRET)
            return res.json({success: true, message: 'login successfuly', user: user, accessToken})

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }
    // test(req, res){
    //     const data= req.body;
    //     res.json("hello1");
    // }
    

    //U
    //Edit
    // [post] /bomaylaadmin/editAdress/:id
    async update(req, res){
        Admin.findOne({phone: req.params.phone})
            .then(user=> {
                console.log(user);
                user.address.province=req.body.province,
                user.address.district=req.body.district,
                user.address.ward=req.body.ward,
                user.address.apartmentAddress=req.body.apartmentAddress,
                user.save();
                res.json({success: true, message: 'Update your address SUCCESSFULLY!',user})
            })
            .catch((err)=> res.json({success: false, message: err}));
    }

    //[GET] /orders
    getOrdersByStatus(req, res){
        // let {statusOrder} = req.params;
        // console.log(statusOrder);
        Order.find({Status:  req.params.statusID})
            .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }
    removeStaff(req, res){
        Admin.findOneAndDelete({_id: req.params.idStaff})
        .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }
    updateAdmin(req, res) {
        let a=req.body
        Admin.findOneAndUpdate({_id: req.params.idStaff}, a)
        // console.log(a);
        .then( (data)=> {
            res.json({status: "success", data: data})
            // res.redirect('/products')
        })
            .catch((err)=> console.log("Log orders FAIL!"+err));

    }
}

module.exports = new AdminController;