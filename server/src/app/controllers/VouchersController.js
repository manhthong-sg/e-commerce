const Favorite = require('../models/Favorite');
const Voucher = require('../models/Voucher');

class VouchersController {
    
    //[GET] /get voucher
    index(req, res){
        Voucher.find({})
            .then(item=> res.json(item))
            .catch((err)=> console.log("Log voucher FAIL!"+err));
    }

    checkVoucher(req, res){
        Voucher.findOne({code: req.body.code})
        .then(voucher=>{
            res.json(voucher)
        })
        .catch(err=> console.log(err))
    }

    //[POST] /vouchers
    addVoucher(req,res){
        var newVoucher=Voucher(req.body);
        newVoucher.save()
        .then(()=> {
            console.log("Create new voucher SUCCESSFULLY!");
            res.redirect('/vouchers')
        })
        .catch((err)=> {
            res.status(500).send('Something broke!')
        })   
    }

}
module.exports=new VouchersController;