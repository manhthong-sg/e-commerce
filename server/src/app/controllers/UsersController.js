const User = require('../models/User')
const bcrypt = require('bcrypt');

class UsersController {

    //[GET] /users
    index(req, res) {
        User.find({})
            .then(user => res.json(user))
            .catch((err) => console.log("Log user FAIL!" + err));
    }
    //[GET] get user by id
    getUserByID(req, res) {
        User.findOne({ _id: req.params.idUser })
            .then((user) => res.json(user))
            .catch((err) => console.log(err))
    }
    //[POST] /users/updateAddress/:idUser
    updateAddress(req, res) {
        console.log(req.params.idUser);
        console.log(req.body);
        User.findOne({ _id: req.params.idUser })
            .then(user => {
                // console.log(user);
                user.address.province = req.body.province,
                    user.address.district = req.body.district,
                    user.address.ward = req.body.ward,
                    user.address.apartmentAddress = req.body.apartmentAddress,
                    user.save();
                console.log("Update your address SUCCESSFULLY!");
                res.json(user)
            })
            .catch((err) => console.log("Update address FAIL!" + err));
    }
    //[POST] /users
    async register(req, res) {
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        req.body.password = passwordHash

        var newUser = User(req.body);
        newUser.save()
            .then(() => {
                console.log("Create new user SUCCESSFULLY!");
                res.redirect('/users')

            })
            .catch((err) => {
                res.status(500).send('Something broke!')
            })
    }

    //[POST] auth user login
    async auth(req, res) {

        // get account from database
        const user = await User.findOne({ phone: req.body.phone });
        // check account found and verify password
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            // authentication failed
            console.log("fail")

            res.status(500).send('Something broke!')

            // res.json({
            //     status: "FAIL",
            //     msg: "Please check your info again.",

            // });

        } else {
            // authentication successful
            console.log("success")

            res.json({
                status: "SUCCESS",
                msg: "Login Successfully",
                user
            });
        }

    }

    detail(req, res) {
        return res.send(
            `
            <strong>THIS IS DETAIL OF NEWS+ </strong>
            `
        );
    }

    getMyVouchers(req, res) {
        User.findOne({ _id: req.params.idUser })
            .populate("myVouchers")
            .then(user => {
                res.json(user)
            })
    }

    handleSpinGame(req, res) {
        User.findOne({ _id: req.body.idUser })
            .then((user) => {
                if (user.spinNum > 0) {
                    user.spinNum = user.spinNum - 1;
                    if (req.body.voucher !== "") {
                        user.myVouchers = [...user.myVouchers, req.body.voucher]
                    }
                    user.save();
                    res.json({ status: "Success", msg: "saved" })
                    console.log("add voucher successfully");
                }
            })
            .catch(err => console.log(err))

    }


}
module.exports = new UsersController;