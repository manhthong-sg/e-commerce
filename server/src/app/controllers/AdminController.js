const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt');

class AdminController {
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
    // // [post] /bomaylaadmin/register
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
            return res.json({success: true, message: 'login successfuly', accessToken})

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }

    //U
    //Edit
    // [post] /bomaylaadmin/:id/edit
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

}

module.exports = new AdminController;