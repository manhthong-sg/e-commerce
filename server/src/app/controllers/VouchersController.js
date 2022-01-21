const Favorite = require('../models/Favorite');
const Voucher = require('../models/Voucher');

class VouchersController {

    //[GET] /get voucher
    index(req, res) {
        Voucher.find({})
            .then(item => res.json(item))
            .catch((err) => console.log("Log voucher FAIL!" + err));
    }

    checkVoucher(req, res) {
        Voucher.findOne({ code: req.body.code })
            .then(voucher => {
                res.json(voucher)
            })
            .catch(err => console.log(err))
    }

    //[POST] /vouchers
    addVoucher(req, res) {
        var newVoucher = Voucher(req.body);
        newVoucher.save()
            .then(() => {
                console.log("Create new voucher SUCCESSFULLY!");
                res.redirect('/vouchers')
            })
            .catch((err) => {
                res.status(500).send('Something broke!')
            })
    }

    removeVoucher(req, res) {
        Voucher.findOneAndDelete({ _id: req.params.idVoucher })
            .then(order => res.json(order))
            .catch((err) => console.log("Log orders FAIL!" + err));
    }
    updateVoucher(req, res) {
        let a=req.body
        Voucher.findOneAndUpdate({_id: req.params.idVoucher}, a)
        // console.log(a);
        .then( (data)=> {
            res.json({status: "success", data: data})
            // res.redirect('/products')
        })
            .catch((err)=> console.log("Log orders FAIL!"+err));

    }
}
module.exports = new VouchersController;