const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const User = require('../models/User')
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
    async register(req, res, next) {
        const { phone, password } = req.body
        if (!phone || !password)
            return res.json({ success: false, message: 'missing phonenumber or password' })
        try {
            const user = await Admin.findOne({ phone })
            if (user) {
                return res.json({ success: false, message: 'This Phone number have already!' })
            }

            //hash password
            const hasedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hasedPassword
            req.body.role=req.body.role || 'NONE'
            const newUser=Admin(req.body);
            await newUser.save()
            console.log('flag')

            //return token
            //sign token >.<
            const accessToken = await jwt.sign({
                phone:newUser.phone,
                role:newUser.role,
            }, process.env.ACCESS_TOKEN_SECRET)

            return res.json({ success: true, message:'register successfully', accessToken})
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }

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

            //when login success return token {phone, token}
            const accessToken = await jwt.sign({
                phone: user.phone,
            }, process.env.ACCESS_TOKEN_SECRET)
            return res.json({ success: true, message: 'login successfuly', accessToken })

        } catch (error) {
            return res.json({ success: false, message: error.message })
        }
    }

    //U
    //Edit
    // [post] /bomaylaadmin/editAdress/:id
    async update(req, res) {
        Admin.findOne({ phone: req.params.phone })
            .then(user => {
                // console.log(req.body),
                user.fullName = req.body.fullName || user.fullName,
                    user.role = req.body.role || user.role,
                    user.address.province = req.body.province || user.address.province,
                    user.address.district = req.body.district || user.address.district,
                    user.address.ward = req.body.ward || user.address.ward,
                    user.address.apartmentAddress = req.body.apartmentAddress || user.address.apartmentAddress,
                    user.save();
                res.json({ success: true, message: 'Update your account SUCCESSFULLY!', user })
            })
            .catch((err) => res.json({ success: false, message: err.message }));
    }

    // //D
    // //Delete lower account
    // // [post] /bomaylaadmin/delete/:id
    // async delete(req, res) {
    //     let user = Admin.findOne({ phone: req.params.phone })
    //     if (user && user.role !== 'ADMIN') {
    //         Admin.deleteOne(phone)
    //         res.json({ success:true, message: 'Delete Account successfully'})
    //     }
    //     else if (user && user.role === 'ADMIN') {
    //         res.json({ success: false, message: `You can't delete Admin Account >.<` })
    //     }
    //     else {
    //         User.findOne({ phone })
    //             .then(
    //                 await User.deleteOne(phone),
    //                 res.json({ success: true, message:'Delete Account successfully'})
    //             )
    //             .catch((err)=>res.json({ success: false, message: err.message }))
    //     }

    // }

    //TT
    //Find user by phone number
    async findUser(req, res) {
        Admin.findOne({ phone: req.params.phone })
            .then(user => res.json({ success: true, message: 'get user successfully', user }))
            .catch((err) => res.json({ success: false, message: err.message }))
    }


}

module.exports = new AdminController;